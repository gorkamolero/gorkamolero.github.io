import {expect, userEvent} from 'storybook/test';
import Masthead from '../components/Masthead.astro';
export default {title:'Components/Masthead', component:Masthead};
export const Engineering = {};
export const Creative = {args:{role:'Creative technologist'}};
export const Music = {args:{role:'Music producer'}};
export const Closed = {};
export const Hovering = {play: async ({canvasElement}) => {
  await userEvent.hover(canvasElement.querySelector('.trigger'));
  await expect(canvasElement.querySelector('.trigger')).toHaveAttribute('aria-expanded', 'true');
}};
export const Pinned = {play: async ({canvasElement}) => {
  await userEvent.click(canvasElement.querySelector('.trigger'));
  await expect(canvasElement.querySelector('.portfolios')).toHaveClass('open');
}};
export const Phone = {...Pinned, parameters:{phone:true}, globals:{viewport:{value:'phone',isRotated:false}}};
