import {tailwindComponentStyles} from './tailwind-component-styles.mjs';
export default {
  stories: ['../src/stories/*.stories.js'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-mcp'],
  framework: {
    name: '@storybook-astro/framework',
    options: { renderMode: 'static', sanitization: {enabled: false} },
  },
  core: { disableTelemetry: true },
  viteFinal(config) {
    config.plugins.push(tailwindComponentStyles());
    return config;
  },
};
