import Component from '../components/CaseLead.astro';
export default {title:'Components/CaseLead', component:Component, parameters:{page:"anima"}};
export const Default = {args:{
  "class": "lead",
  "slots": {
    "default": "\n        <p class=\"meta eyebrow\">Case · open-world point-and-click</p>\n        <h2 class=\"case-title\">Anima</h2>\n        <p class=\"intro\">Anima is a system I built for creating open-world point-and-click games with AI. You write the story, and AI makes the characters, the scenes and whatever happens when a player tries something the story doesn't cover. Shadow Over Innsmouth, a Lovecraft adventure, is the game I'm making with it, and it isn't finished yet.</p>\n        <p class=\"meta chips\">Game creation with AI <span class=\"dot\">·</span> Phaser and React <span class=\"dot\">·</span> Playable prototype</p>\n      "
  }
}};
