import {compile} from '@tailwindcss/node';
import {dirname} from 'node:path';

/**
 * storybook-astro 1.12's component marker injects raw <style> text into JS,
 * bypassing Vite's CSS pipeline in both dev and static builds. Compile those
 * strings with the same Tailwind compiler as the site; never ship raw @apply.
 * This runs after storybook-astro-component-marker via viteFinal.
 */
export function tailwindComponentStyles() {
  return {
    name: 'portfolio:storybook-tailwind-component-styles',
    enforce: 'post',
    async transform(code, id) {
      if (!id.endsWith('.astro') || !code.includes('style.textContent')) return;
      const injection = /style\.setAttribute\("data-astro-(?:build|dev)", ("(?:\\.|[^"\\])*")\);\s*style\.textContent = ("(?:\\.|[^"\\])*");/g;
      let result = '', cursor = 0;
      for (const match of code.matchAll(injection)) {
        const css = JSON.parse(match[2]);
        if (!/@(?:apply|reference)\b/.test(css)) continue;
        const source = JSON.parse(match[1]).replace(/:\d+$/, '');
        const compiler = await compile(css, {base:dirname(source), onDependency:file=>this.addWatchFile(file)});
        const compiled = compiler.build([]);
        result += code.slice(cursor, match.index) + match[0].replace(match[2], JSON.stringify(compiled));
        cursor = match.index + match[0].length;
      }
      if (!cursor) return;
      return {code:result + code.slice(cursor), map:null};
    },
  };
}
