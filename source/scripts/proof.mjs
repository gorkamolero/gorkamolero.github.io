import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.resolve(import.meta.dirname,'../.cache/ms-playwright');
const { chromium } = await import('playwright');
const root=path.resolve(import.meta.dirname,'..');
const dist=path.join(root,'dist'), proof=path.join(root,'proof');
await fs.mkdir(proof,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm','.mp3':'audio/mpeg','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  const file=path.join(dist,decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!file.startsWith(dist+path.sep))throw Error('Invalid path');
  const data=await fs.readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true, ...(process.env.PROOF_CHROME ? {executablePath:process.env.PROOF_CHROME} : {})});
await fs.writeFile(path.join(proof,'environment.json'),JSON.stringify({browser:browser.version(),engine:'Chromium',playwright:JSON.parse(await fs.readFile(path.join(root,'node_modules/playwright/package.json'),'utf8')).version,executable:process.env.PROOF_CHROME||'Playwright bundled Chromium',widths:[1280,375],height:900},null,2)+'\n');
const only=process.argv.slice(2).find(arg=>arg!=='--');
const files=(await fs.readdir(dist)).filter(f=>f.endsWith('.html')&&(!only||f===`${only}.html`)).sort();
if(!files.length)throw Error(`No page matched ${only}`);
const jobs=files.flatMap(file=>[1280,375].map(width=>({file,width})));
const results=[];
const ignored=url=>/cloudflareinsights\.com|elevenlabs|convai-widget/.test(url);
try {
 await Promise.all(Array.from({length:4},async()=>{
  while(jobs.length){
   const {file,width}=jobs.shift();
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const network=[];
   page.on('requestfailed',r=>{if(!ignored(r.url()))network.push(`${r.failure()?.errorText} ${r.url()}`);});
   page.on('response',r=>{if(r.status()>=400&&!ignored(r.url()))network.push(`HTTP ${r.status()} ${r.url()}`);});
   const errors=[];
   try {
    await page.goto(`${origin}/${file}`,{waitUntil:'domcontentloaded',timeout:30000});
    await page.evaluate(()=>document.fonts.ready);
    // Scroll each viewport to activate lazy images and iframes before the full-page capture.
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});
    // Offscreen carousel slides are lazy too; load every original image for the asset audit.
    await page.evaluate(async()=>{await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});
    await page.waitForTimeout(1500);
    const metrics=await page.evaluate(()=>{
     const photo=document.querySelector('.portrait-round');
     const links=[...document.querySelectorAll('.masthead .links > a, .masthead .trigger')];
     const rects=links.map(a=>{const r=a.getBoundingClientRect();return {text:a.textContent,x:r.x,y:r.y,right:r.right,height:r.height,lines:a.getClientRects().length};});
     return {viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,photoLoaded:photo?.complete&&photo.naturalWidth>0,links:rects,place:document.querySelector('.place').getBoundingClientRect().toJSON(),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),media:[...document.querySelectorAll('video,audio')].map(v=>({src:v.currentSrc||v.src,readyState:v.readyState,error:v.error?.message||null})),current:[...document.querySelectorAll('[aria-current="page"]')].map(a=>a.getAttribute('href')),externalSameTab:[...document.querySelectorAll('a[href^="http"]')].filter(a=>!a.href.includes('gorkamolero.github.io')&&(a.target!=='_blank'||!/noopener/.test(a.rel))).map(a=>a.href)};
    });
    if(metrics.scrollWidth>width)errors.push(`horizontal overflow: ${metrics.scrollWidth}px > ${width}px`);
    if(!metrics.photoLoaded)errors.push('masthead photo not loaded');
    if(metrics.brokenImages.length)errors.push('broken images: '+metrics.brokenImages.join(', '));
    if(width===1280){const mids=metrics.links.map(r=>r.y+r.height/2);if(Math.max(...mids)-Math.min(...mids)>6||metrics.links.some(r=>r.lines!==1))errors.push('desktop menu wraps');}
    const expected=['index','agents','design-systems','creative','pre-ai','music'].includes(file.slice(0,-5))?[`./${file}`]:[];
    if(JSON.stringify(metrics.current)!==JSON.stringify(expected))errors.push('incorrect aria-current');
    if(metrics.externalSameTab.length)errors.push('external links without a new tab and noopener: '+metrics.externalSameTab.join(', '));
    await page.screenshot({path:path.join(proof,`${file.slice(0,-5)}-${width}.png`),fullPage:true,timeout:30000});
    // Chromium cancels metadata range downloads once enough data is buffered. A decoded
    // metadata state with no MediaError distinguishes these from unavailable assets.
    const metadataCancellations=network.filter(n=>n.startsWith('net::ERR_ABORTED ')&&metrics.media.some(v=>n.endsWith(v.src)&&v.readyState>=1&&!v.error));
    const failures=[...new Set(network.filter(n=>!metadataCancellations.includes(n)))];
    const result={file,width,errors,network:failures,metadataCancellations,metrics};
    results.push(result);console.log(`${errors.length||failures.length?'FAIL':'PASS'} ${file} @ ${width}: ${[...errors,...failures].join('; ')||'layout, photo and assets OK'}`);
   }catch(e){results.push({file,width,errors:[e.message],network});console.log(`FAIL ${file} @ ${width}: ${e.message}`);}
   finally{await page.close();}
  }
 }));
 // Explicit alias check for the root URL.
 const response=await fetch(origin+'/');
 if(response.status!==200||(await response.text())!==await fs.readFile(path.join(dist,'index.html'),'utf8'))throw Error('/ does not serve index.html');
 results.sort((a,b)=>a.file.localeCompare(b.file)||b.width-a.width);
 await fs.writeFile(path.join(proof,'results.json'),JSON.stringify(results,null,2)+'\n');
 const failed=results.filter(r=>r.errors.length||r.network.length);
 console.log(`Checked ${results.length} page/viewport combinations; ${failed.length} failures. Root alias verified.`);
 process.exitCode=failed.length?1:0;
}finally{await browser.close();await new Promise(r=>server.close(r));}
