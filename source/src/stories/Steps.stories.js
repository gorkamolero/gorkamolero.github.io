import Component from '../components/Steps.astro';
export default {title:'Components/Steps', component:Component, parameters:{page:"carvingen"}};
export const Default = {args:{
  "class": "steps",
  "slots": {
    "default": "\n<figure class=\"step\"><div class=\"shot\"><img src=\"./assets/carvingen/owl-1-first-image.jpg\" alt=\"A great horned owl landing on a log.\" /></div><figcaption>A text prompt and nothing else.</figcaption></figure>\n<figure class=\"step\"><div class=\"shot\"><img src=\"./assets/carvingen/owl-2-as-wood.jpg\" alt=\"The owl as pale wood.\" /></div><figcaption>The same owl in one block of pale, unstained wood.</figcaption></figure>\n<figure class=\"step\"><div class=\"shot\"><img src=\"./assets/carvingen/owl-3a-wings-up.jpg\" alt=\"The owl with its wings raised.\" /></div><figcaption>Wings raised higher. The one I kept.</figcaption></figure>\n"
  }
}};
