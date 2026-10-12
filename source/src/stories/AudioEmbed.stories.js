import Component from '../components/AudioEmbed.astro';
export default {title:'Components/AudioEmbed', component:Component, parameters:{page:"the-pulse"}};
export const Default = {args:{
  "class": "audio-embed",
  "slots": {
    "default": "\n          <div class=\"audio-label\">Hear the narrator</div>\n          <audio controls=\"\" preload=\"metadata\" src=\"./assets/the-pulse-narrator.mp3\"></audio>\n          <p class=\"note\">This is the actual narration audio, pulled straight from a live session — the game generating the voice as it plays. Each world is cast with its own voice through ElevenLabs, tuned for theatricality and compared across TTS providers; the voice is a design choice per story, not a default read-aloud.</p>\n        "
  }
}};
