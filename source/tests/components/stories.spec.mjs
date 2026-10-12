import {test, expect} from '@playwright/test';
import fs from 'node:fs';
const index = JSON.parse(fs.readFileSync(new URL('../../storybook-static/index.json', import.meta.url), 'utf8'));
const stories = Object.values(index.entries).filter(entry => entry.type === 'story');
const embed = fs.readFileSync(new URL('../fixtures/embed.html', import.meta.url), 'utf8');
for (const story of stories) {
  const menu = /components-(masthead|portfoliosmenu)--/.test(story.id);
  const onlyPhone = story.id.endsWith('--phone');
  const onlyDesktop = menu && story.id.endsWith('--hovering');
  for (const width of onlyPhone ? [390] : onlyDesktop ? [1280] : [1280, 390]) {
    test(`${story.id} @ ${width}`, async ({browser}) => {
      const phone = width === 390;
      const context = await browser.newContext({viewport:{width,height:phone?844:900},deviceScaleFactor:1,hasTouch:phone,isMobile:phone,reducedMotion:'reduce'});
      const page = await context.newPage();
      const errors=[];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {if (message.type() === 'error' && !message.text().startsWith('Failed to load resource')) errors.push(message.text());});
      page.on('response', response => {
        if (response.url().startsWith('http://127.0.0.1:6007/') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      try {
        // Test the component frame, not changing third-party player artwork.
        await page.route('**/*', async route => {
          const url = new URL(route.request().url());
          if (url.hostname === '127.0.0.1' || ['fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)) return route.continue();
          if (route.request().resourceType() === 'document') return route.fulfill({contentType:'text/html',body:embed});
          return route.abort();
        });
        await page.goto(`http://127.0.0.1:6007/iframe.html?id=${story.id}&viewMode=story`);
        await page.waitForFunction(id => window.__STORYBOOK_PREVIEW__?.storyRenders?.some(render => render.id === id && render.phase === 'finished'), story.id);
        await expect(page.locator('#storybook-root > *').first()).toBeAttached();
        await page.evaluate(async () => {
          await Promise.all(['16px "EB Garamond"','16px "IM Fell English SC"','italic 16px "IM Fell English"'].map(font=>document.fonts.load(font)));
          await document.fonts.ready;
          await Promise.all([...document.images].map(async image => {image.loading='eager';await image.decode();}));
          document.querySelectorAll('video,audio').forEach(media => media.pause());
        });
        await page.addStyleTag({content:'*, *::before, *::after {animation:none !important;transition:none !important;caret-color:transparent !important} video::-webkit-media-controls, audio::-webkit-media-controls {display:none !important}'});
        if (menu) {
          const trigger = page.locator('.trigger');
          if (/--(hovering|pinned|phone)$/.test(story.id)) await expect(trigger).toHaveAttribute('aria-expanded','true');
          else await expect(trigger).toHaveAttribute('aria-expanded','false');
          if (story.id.endsWith('--phone')) {
            await trigger.tap();
            await expect(trigger).toHaveAttribute('aria-expanded','false');
            await trigger.tap();
            await expect(trigger).toHaveAttribute('aria-expanded','true');
          }
        }
        if (story.id.startsWith('components-textlink--')) {
          const link = page.locator('#storybook-root a');
          if (story.id.includes('external') || story.id.endsWith('--hover')) {
            await expect(link).toHaveAttribute('target','_blank');
            await expect(link).toHaveAttribute('rel','noopener');
            expect(await link.evaluate(a=>getComputedStyle(a,'::after').content)).toBe('"↗"');
          }
          if (story.id.includes('hover')) await link.hover();
        }
        if (story.id === 'components-carousel--next-slide') await expect(page.locator('.carousel-count')).toHaveText('2 / 10');
        expect(await page.locator('style[data-astro-build]').evaluateAll(styles => styles.some(style => /@(?:apply|reference)\b/.test(style.textContent)))).toBe(false);
        if (story.id.startsWith('components-carousel--')) expect(await page.locator('.carousel-track').evaluate(track=>getComputedStyle(track).display)).toBe('flex');
        expect(errors).toEqual([]);
        await expect(page).toHaveScreenshot(`${story.id}-${width}.png`, {fullPage:true});
      } finally {await context.close();}
    });
  }
}
