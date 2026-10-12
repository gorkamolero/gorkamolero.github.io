import fs from 'node:fs/promises';
import Color from 'colorjs.io';
const root = new URL('../', import.meta.url);
const read = async name => JSON.parse(await fs.readFile(new URL(`tokens/${name}.tokens.json`, root), 'utf8'))[name];
const [colors, type, dimension, number] = await Promise.all(['color', 'type', 'dimension', 'number'].map(read));
const dim = name => { const v = dimension[name].$value; return `${v.value}${v.unit}`; };
const color = v => new Color(v.colorSpace, v.components, v.alpha).to('srgb').toString({format:'hex'});
const projection = {
  version: 'alpha',
  name: 'Gorka Molero Portfolio',
  description: 'Generated token projection; edit tokens/*.tokens.json and run pnpm design:sync.',
  colors: {primary: color(colors.vermilion.$value), ...Object.fromEntries(Object.entries(colors).map(([name, {$value:v}]) => [name, color(v)]))},
  typography: Object.fromEntries(Object.entries(type).map(([name, {$value:v}]) => [name, {fontFamily:v.join(', '),fontSize:dim(name==='body'?'1-15-rem':'0-95-rem'),fontWeight:number['font-weight-400'].$value}])),
  spacing: Object.fromEntries(Object.entries(dimension).map(([name, {$value:v}]) => [name, `${v.value}${v.unit}`])),
  rounded: {code:dim('2-px')},
  components: { 'link-hover': {backgroundColor:'{colors.paper}',textColor:'{colors.primary}'},
    ...Object.fromEntries(Object.keys(colors).filter(name=>name==='rule'||name.startsWith('surface-')).map(name=>[name,{backgroundColor:`{colors.${name}}`}])),
    ...Object.fromEntries(['ink','ink-soft','vermilion','gradient-start','gradient-middle','gradient-end'].map(name => [name,{backgroundColor:'{colors.paper}',textColor:`{colors.${name}}`}]))},
};
// JSON is a YAML subset; quoting every key also makes source-derived names safe.
const front = `---\n${JSON.stringify(projection, null, 2)}\n---`;
const file = new URL('DESIGN.md', root);
const source = await fs.readFile(file, 'utf8');
const result = source.replace(/^---\n[\s\S]*?\n---/, front);
if (process.argv.includes('--check')) {
  if (result !== source) throw new Error('DESIGN.md tokens are stale; run pnpm design:sync');
  console.log('DESIGN.md token projection matches DTCG source.');
} else await fs.writeFile(file, result);
