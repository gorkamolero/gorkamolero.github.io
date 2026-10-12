import Component from '../components/Figure.astro';
export default {title:'Components/Figure', component:Component, parameters:{page:"anima"}};
export const Default = {args:{
  "class": "plate",
  "slots": {
    "default": "\n          <div class=\"shot\"><video controls=\"\" playsinline=\"\" preload=\"none\" poster=\"./assets/creative/point-and-click-bar-poster.jpg\" src=\"https://pub-066596d7e4fe4de2b74eac13bb03fe55.r2.dev/point-and-click-bar.mp4\" aria-label=\"A game built on Anima running: a bar scene where the player picks a line or types anything, and the characters answer.\"></video></div>\n          <figcaption>A game built on Anima, running. In the bar you can pick a line or type anything you like, and every character answers in their own voice.</figcaption>\n        "
  }
}};
export const Image = {args:{class:'plate',slots:{default:'<div class="shot"><img src="./assets/koda/koda-poster.jpg" alt="Koda" /></div>'}}};
export const Caption = {args:{...Image.args,caption:'Recorded live: Claude on one Mac, a collaborator on another.'}};
