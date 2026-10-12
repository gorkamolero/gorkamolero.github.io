import Component from '../components/PointsList.astro';
export default {title:'Components/PointsList', component:Component, parameters:{page:"anima"}};
export const Default = {args:{
  "class": "points",
  "slots": {
    "default": "\n          <li>Design a purpose-built language (StoryScript) instead of a JSON schema or an off-the-shelf engine — plain text that an LLM can write, a human can read, and the runtime executes directly with no compile step.</li>\n          <li>Separate authoring primitives from runtime behavior, so a scene can be edited and played from the same source of truth.</li>\n          <li>React for tooling, Phaser for execution — each framework does the job it is good at instead of one doing both badly.</li>\n          <li>Treat AI as a production pipeline, not a chat box bolted onto the game — and extract alpha with a white/black difference matte instead of background removal, so skin tones on a grey backdrop come out clean.</li>\n          <li>Build a real game (Shadow Over Innsmouth) to validate the system, rather than shipping an abstract engine with no proof it holds up.</li>\n          <li>Verify scenes in a local browser harness — movement, perspective scale, hotspot coverage, and door transitions get checked against the running game.</li>\n        "
  }
}};
