import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { astroServerLifecycle } from './.storybook/astro-server-lifecycle.mjs';
export default defineConfig({
  vite: { plugins: [tailwindcss(), ...(process.env.PORTFOLIO_STORYBOOK ? [astroServerLifecycle()] : [])] },
  site: 'https://gorkamolero.github.io',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: false,
});
