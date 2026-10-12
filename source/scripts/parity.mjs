import fs from 'node:fs/promises';
import path from 'node:path';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
import {capture,root} from './capture.mjs';
const baseline=path.join(root,'baseline'), output=path.join(root,'parity');
const only=process.argv.slice(2).find(arg=>!arg.startsWith('--'));
const exact=process.argv.includes('--exact');
const manifest=await capture(output,only);
const baselineManifest=JSON.parse(await fs.readFile(path.join(baseline,'manifest.json')));
if(!only && JSON.stringify([...manifest.captures].sort())!==JSON.stringify([...baselineManifest.captures].sort())) throw Error('Capture inventory changed');
if(manifest.browser!==baselineManifest.browser) throw Error('Browser version changed; compare using the baseline browser');
const results=[];
for(const name of manifest.captures) {
  const before=JSON.parse(await fs.readFile(path.join(baseline,name+'.json')));
  const after=JSON.parse(await fs.readFile(path.join(output,name+'.json')));
  const a=PNG.sync.read(await fs.readFile(path.join(baseline,name+'.png'))), b=PNG.sync.read(await fs.readFile(path.join(output,name+'.png')));
  const width=Math.max(a.width,b.width), height=Math.max(a.height,b.height);
  const pad=p=>{const out=new PNG({width,height}); PNG.bitblt(p,out,0,0,p.width,p.height,0,0); return out;};
  const diff=new PNG({width,height});
  const pixels=pixelmatch(pad(a).data,pad(b).data,diff.data,width,height,{threshold:0,includeAA:true});
  await fs.rm(path.join(output,name+'-diff.png'),{force:true});
  if(pixels) await fs.writeFile(path.join(output,name+'-diff.png'),PNG.sync.write(diff));
  const result={name,text:before.text===after.text,links:JSON.stringify(before.links)===JSON.stringify(after.links),pixels,share:pixels/(width*height),dimensions:a.width===b.width&&a.height===b.height};
  results.push(result); console.log(JSON.stringify(result));
}
await fs.writeFile(path.join(output,'results.json'),JSON.stringify(results,null,2)+'\n');
process.exitCode=results.some(r=>!r.text||!r.links||!r.dimensions||r.share>(exact?0:0.001))?1:0;
