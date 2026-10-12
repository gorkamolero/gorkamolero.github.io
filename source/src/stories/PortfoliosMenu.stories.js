import MenuStage from '../../.storybook/MenuStage.astro';
import {expect, userEvent} from 'storybook/test';
export default {title:'Components/PortfoliosMenu', component:MenuStage};
export const Closed = {};
export const Hovering = {play:async({canvasElement})=>{
  const trigger=canvasElement.querySelector('.trigger');
  await userEvent.hover(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded','true');
}};
export const Pinned = {play:async({canvasElement})=>{
  const trigger=canvasElement.querySelector('.trigger');
  await userEvent.click(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded','true');
}};
export const Phone = {...Pinned, parameters:{phone:true}, globals:{viewport:{value:'phone',isRotated:false}}};
