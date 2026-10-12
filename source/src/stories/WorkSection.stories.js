import Component from '../components/WorkSection.astro';
export default {title:'Components/WorkSection', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "work",
  "slots": {
    "default": "\n        <h2><em>openroadie</em></h2>\n        <p class=\"meta\">Roadie · 2026 <span class=\"dot\">·</span> TypeScript, React, Vite, Tailwind, React Flow, TanStack Query, Node, Express, Postgres, Redis, Vercel AI SDK, MCP, Storybook, Vitest, Playwright, Docker</p>\n        <p>The open-source context layer that came out of Roadie. It builds a graph of an organisation from the tools it already uses, around forty of them from GitHub and Jira to PagerDuty and Slack, and serves it to AI agents over MCP. Agents can only act through deterministic actions an admin has defined, with every call scoped to the caller.</p>\n        <p>I wrote much of its foundation and designed and built its interfaces, from the data-source pipelines and the relationship maps in React Flow to agent-led onboarding. Its design system, <code>@roadiehq/ui</code>, which I co-led, has about sixty components in Storybook, including the AI elements for agent conversations.</p>\n        <p class=\"actions\"><a class=\"button primary\" href=\"https://github.com/RoadieHQ/openroadie\" target=\"_blank\" rel=\"noopener\">Source</a>\n          <a class=\"button\" href=\"./design-systems.html#openroadie\">Design system</a></p>\n      "
  }
}};
import Figure from '../components/Figure.astro';
export const WithMedia = {args:{slots:{default:[
  '<h2>Koda</h2><p>A desktop app for working collaboratively with coding agents.</p>',
  {component:Figure,props:{class:'plate',caption:'Recorded live: Claude on one Mac, a collaborator on another.'},slots:{default:'<div class="shot"><img src="./assets/koda/koda-poster.jpg" alt="Koda" /></div>'}},
]}}};
