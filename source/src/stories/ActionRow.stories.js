import Component from '../components/ActionRow.astro';
export default {title:'Components/ActionRow', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "actions",
  "slots": {
    "default": "<a class=\"button primary\" href=\"https://github.com/RoadieHQ/openroadie\" target=\"_blank\" rel=\"noopener\">Source</a>\n          <a class=\"button\" href=\"./design-systems.html#openroadie\">Design system</a>"
  }
}};
