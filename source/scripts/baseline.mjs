import fs from 'node:fs/promises';
import path from 'node:path';
import {capture,root} from './capture.mjs';
const destination=path.join(root,'baseline');
try { if (process.argv.includes('--force')) throw Object.assign(new Error(), {code:'ENOENT'}); await fs.access(path.join(destination,'manifest.json')); throw Error('Baseline already exists; preserve it.'); }
catch(error) { if(error.code!=='ENOENT') throw error; }
await capture(destination);
