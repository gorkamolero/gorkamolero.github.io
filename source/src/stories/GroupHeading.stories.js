import Component from '../components/GroupHeading.astro';
export default {title:'Components/GroupHeading', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "group",
  "slots": {
    "default": "Agents"
  }
}};
