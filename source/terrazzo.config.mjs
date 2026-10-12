import {defineConfig} from '@terrazzo/cli';
import Color from 'colorjs.io';
import css from '@terrazzo/plugin-css';
import tailwind from '@terrazzo/plugin-tailwind';
export default defineConfig({
  tokens: ['color','type','dimension','relative','motion','dots','number'].map(name => `./tokens/${name}.tokens.json`),
  outDir: './src/styles/generated/',
  plugins: [
    css({filename:'tokens.css', transform(token) {
      if (token.$type !== 'color') return;
      const {colorSpace, components, alpha = 1} = token.$value;
      const rgb = new Color(colorSpace, components, alpha).to('srgb');
      // Preserve the original sRGB interpolation and 8-bit channels, including exact alpha.
      return `rgb(${rgb.coords.map(n => Math.round(n * 255)).join(' ')} / ${alpha})`;
    }}),
    tailwind({template:new URL('./tokens/tailwind.template.css', import.meta.url).pathname,filename:'theme.css',theme:{color:['color.*'],font:['type.*'],spacing:['dimension.*']}}),
  ],
});
