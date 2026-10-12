import Component from '../components/Narration.astro';
export default {title:'Components/Narration', component:Component, parameters:{page:"the-pulse"}};
export const Default = {args:{
  "class": "narration",
  "slots": {
    "default": "\n          <blockquote>\"The February fog rolls thick over the Massachusetts coastline as your bus groans to a halt at the edge of a world that seems to have forgotten the twentieth century exists. The driver — a gaunt man with darting eyes — doesn't look at you when he mutters, 'End of the line.'… The letter you carry feels heavier in your coat pocket. Its message remains legible: 'Come to Innsmouth. The sea remembers what the land forgets.'\"</blockquote>\n          <span class=\"src\">The narrator's actual prose, verbatim from the session above — the AI writing, not a scripted line.</span>\n        "
  }
}};
