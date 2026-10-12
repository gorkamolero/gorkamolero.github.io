import {defineConfig} from '@playwright/test';
import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.resolve('.cache/ms-playwright');
export default defineConfig({
  testDir: './tests/components',
  fullyParallel: true,
  workers: 4,
  timeout: 60000,
  expect: {timeout: 15000, toHaveScreenshot: {threshold: 0, maxDiffPixels: 0, animations: 'disabled', caret: 'hide', scale: 'css'}},
  use: {baseURL: 'http://127.0.0.1:6007', browserName: 'chromium', deviceScaleFactor: 1, reducedMotion: 'reduce'},
  snapshotPathTemplate: '{testDir}/__screenshots__/{platform}/{arg}{ext}',
  outputDir: './test-results',
  reporter: [['list'], ['json', {outputFile: './test-results/results.json'}]],
  webServer: {command: 'node scripts/serve-storybook.mjs', url: 'http://127.0.0.1:6007/index.json', reuseExistingServer: false, timeout: 30000},
});
