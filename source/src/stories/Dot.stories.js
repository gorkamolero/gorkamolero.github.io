import Component from '../components/Dot.astro';
export default {title:'Components/Dot', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "dot",
  "slots": {
    "default": "·"
  }
}};
export const Separator = {args:{variant:'separator','aria-hidden':'true'}};
export const Leading = {args:{variant:'leading','aria-hidden':'true'}};
export const Name = {args:{variant:'name','aria-hidden':'true'}};
