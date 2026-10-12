import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.resolve(import.meta.dirname, '../.cache/ms-playwright');
const { chromium } = await import('playwright');
export const root = path.resolve(import.meta.dirname, '..');
export async function capture(destination, only) {
  await fs.mkdir(destination, { recursive: true });
  const dist = path.join(root, 'dist');
  const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm','.mp3':'audio/mpeg','.woff2':'font/woff2'};
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const file = path.join(dist, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
      if (!file.startsWith(dist + path.sep)) throw Error('Invalid path');
      const data = await fs.readFile(file);
      res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'}); res.end(data);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({headless: true, ...(process.env.PROOF_CHROME ? {executablePath: process.env.PROOF_CHROME} : {})});
  const manifest = { browser: browser.version(), captures: [] };
  try {
    const files = (await fs.readdir(dist)).filter(f => f.endsWith('.html') && (!only || f === `${only}.html`)).sort();
    const jobs=files.flatMap(file=>[[1280,900],[390,844]].map(([width,height])=>({file,width,height})));
    await Promise.all(Array.from({length:4},async()=>{ while(jobs.length) {
      const {file,width,height}=jobs.shift();
      const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1,hasTouch:width===390,isMobile:width===390});
      await page.route(/cloudflareinsights\.com|elevenlabs|convai-widget/, route => route.abort());
      await page.goto(`http://127.0.0.1:${server.address().port}/${file}`, {waitUntil:'load'});
      await page.evaluate(async () => {
        document.querySelectorAll('elevenlabs-convai').forEach(el => el.remove());
        await document.fonts.ready;
        for (let y=0;y<document.body.scrollHeight;y+=700) { scrollTo(0,y); await new Promise(r=>setTimeout(r,80)); }
        await Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));
        document.querySelectorAll('video,audio').forEach(v=>v.pause());
        scrollTo(0,0);
      });
      await page.waitForTimeout(1500);
      const save = async (suffix, masthead=false) => {
        // Capture-only: hide browser loading chrome without touching posters or playback.
        await page.addStyleTag({content: 'video::-webkit-media-controls, audio::-webkit-media-controls, video::-webkit-media-controls-panel, audio::-webkit-media-controls-panel, video::-webkit-media-controls-enclosure, audio::-webkit-media-controls-enclosure { display: none !important; }'});
        const name = `${file.slice(0,-5)}-${width}${suffix}`;
        const data = await page.evaluate(() => ({text:document.body.innerText,links:[...document.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'),target:a.getAttribute('target'),rel:a.getAttribute('rel')}))}));
        await fs.writeFile(path.join(destination,`${name}.json`),JSON.stringify(data,null,2)+'\n');
        await (masthead ? page.locator('.masthead') : page).screenshot({path:path.join(destination,`${name}.png`),...(masthead?{}:{fullPage:true}),animations:'disabled',timeout:30000});
        manifest.captures.push(name);
      };
      await save('');
      if(file==='index.html') {
        await save('-menu-closed',true);
        const trigger=page.locator('.trigger');
        if(width===1280) { await trigger.hover(); await page.waitForTimeout(650); await save('-menu-hover',true); }
        await trigger.click(); await page.mouse.move(0,0); await page.waitForTimeout(650); await save('-menu-pinned',true);
        if(width===390) { await trigger.tap(); await trigger.tap(); await save('-menu-tap',true); }
      }
      console.log(`Captured ${file} ${width}`);
      await page.close();
    }
    }));
    manifest.captures.sort();
    await fs.writeFile(path.join(destination,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  } finally { await browser.close(); await new Promise(r=>server.close(r)); }
  return manifest;
}
