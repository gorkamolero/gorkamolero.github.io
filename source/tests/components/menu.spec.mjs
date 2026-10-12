import {test, expect} from '@playwright/test';
import fs from 'node:fs';
const motion = JSON.parse(fs.readFileSync(new URL('../../tokens/motion.tokens.json',import.meta.url),'utf8')).motion;
const grace = motion['hover-grace'].$value.value;
test('desktop menu grace, pin, outside click and Escape', async ({page}) => {
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/iframe.html?id=components-masthead--closed&viewMode=story');
  const menu=page.locator('.portfolios'), trigger=page.locator('.trigger');
  await trigger.hover();
  await expect(menu).toHaveClass(/hover/);
  const rect=await trigger.boundingBox();
  // A one-pixel slip remains inside the menu's CSS tolerance area.
  await page.mouse.move(rect.x+rect.width/2,rect.y-1);
  await page.waitForTimeout(grace+60);
  await expect(menu).toHaveClass(/hover/);
  await page.mouse.move(0,0);
  await page.waitForTimeout(grace/2);
  await expect(trigger).toHaveAttribute('aria-expanded','true');
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  await trigger.click();
  await page.mouse.move(0,0);
  await page.waitForTimeout(grace+60);
  await expect(menu).toHaveClass(/open/);
  await page.mouse.click(10,400);
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  await trigger.click();
  await trigger.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded','false');
  await expect(menu).not.toHaveClass(/open|hover/);
});
test('phone menu opens and closes with actual taps', async ({browser}) => {
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  try {
    const page=await context.newPage();
    await page.goto('http://127.0.0.1:6007/iframe.html?id=components-masthead--closed&viewMode=story');
    const trigger=page.locator('.trigger');
    await trigger.tap();
    await expect(trigger).toHaveAttribute('aria-expanded','true');
    await expect(page.locator('.drawer')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await trigger.tap();
    await expect(trigger).toHaveAttribute('aria-expanded','false');
    await expect(page.locator('.drawer')).toBeHidden();
  } finally {await context.close();}
});
