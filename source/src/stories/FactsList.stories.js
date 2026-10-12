import Component from '../components/FactsList.astro';
export default {title:'Components/FactsList', component:Component, parameters:{page:"anima"}};
export const Default = {args:{
  "class": "facts",
  "slots": {
    "default": "\n          <li><strong>Language</strong><span>StoryScript — my own DSL for scenes, hotspots, branching dialogue, and inventory.</span></li>\n          <li><strong>Runtime</strong><span>Phaser scenes, walkable characters, hotspot interaction, scene transitions.</span></li>\n          <li><strong>Art pipeline</strong><span>AI-generated characters and backgrounds, cut out with a difference matte and QC'd into spritesheets.</span></li>\n        "
  }
}};
