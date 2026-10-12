import Component from '../components/CaseLead.astro';
export default {title:'Components/CaseLead', component:Component, parameters:{page:"anima"}};
export const Default = {args:{
  "class": "lead",
  "slots": {
    "default": "\n        <p class=\"meta eyebrow\">Live · adventure engine</p>\n        <h2 class=\"case-title\">Anima</h2>\n        <p class=\"intro\">A graphic-adventure creation system: write scenes and dialogue, place hotspots, run the AI art pipeline, and walk the result as a playable point-and-click game. I proved it by building a real game on it — a Lovecraft adventure, Shadow Over Innsmouth.</p>\n        <p class=\"meta chips\">Creative AI toolchain <span class=\"dot\">·</span> Phaser + React <span class=\"dot\">·</span> Playable demo on request</p>\n      "
  }
}};
