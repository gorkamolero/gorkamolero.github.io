import Component from '../components/ProjectIndex.astro';
export default {title:'Components/ProjectIndex', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "index",
  "slots": {
    "default": "\n          <li><a href=\"./molter.html\">Molter</a><span>A dating protocol for personal AI agents, where your agent learns the real you and negotiates anonymously with other people's agents.</span></li>\n          <li><a href=\"./solderpunk.html\">Solderpunk</a><span>Synth explorers with guided tutorials and live MIDI control.</span></li>\n          <li><a href=\"./carvingen.html\">Carvingen</a><span>A node canvas for AI image, video and 3D generation.</span></li>\n          <li><a href=\"./streamtui.html\">StreamTUI</a><span>A terminal streaming client in Rust that searches, casts to a screen and can be scripted with JSON.</span></li>\n        "
  }
}};
