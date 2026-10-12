import Component from '../components/Job.astro';
export default {title:'Components/Job', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "job",
  "slots": {
    "default": "\n            <h3>Roadie <span class=\"at\">Senior Software Engineer</span></h3>\n            <p class=\"when\">2024–2026 · Remote</p>\n            <p>Modernized the UI of a Backstage-based developer platform and became its de facto UI and product-design lead. Wrote much of the foundation of Roadie's context layer for AI agents, now open source as <a href=\"https://github.com/RoadieHQ/openroadie\" target=\"_blank\" rel=\"noopener\"><em>openroadie</em></a>, and designed its interfaces for data-source pipelines, relationship mapping and agent-led onboarding.</p>\n          "
  }
}};
