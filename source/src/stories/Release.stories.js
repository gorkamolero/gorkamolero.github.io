import Component from '../components/Release.astro';
export default {title:'Components/Release', component:Component, parameters:{page:"music"}};
export const Default = {args:{
  "class": "release",
  "slots": {
    "default": "\n            <div>\n              <h3>Thumos</h3>\n              <p class=\"meta\">Single</p>\n            </div>\n            <div class=\"player\"><iframe src=\"https://open.spotify.com/embed/track/7DY57dKpH4SXpoHuN62htI?utm_source=generator&amp;theme=0\" height=\"152\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\" title=\"Thumos on Spotify\"></iframe></div>\n          "
  }
}};
