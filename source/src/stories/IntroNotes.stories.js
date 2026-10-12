import Component from '../components/IntroNotes.astro';
export default {title:'Components/IntroNotes', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "intro",
  "slots": {
    "default": "\n        <p class=\"note\">Web products<span>since 2012</span></p>\n        <p>I'm Gorka Molero. I've been building for the web for fourteen years and worked as a senior frontend engineer and UI lead on <a href=\"https://roadie.io\" target=\"_blank\" rel=\"noopener\">Roadie</a>, <a href=\"https://www.pickzen.com\" target=\"_blank\" rel=\"noopener\">Pickzen</a> and <a href=\"https://typeshare.co\" target=\"_blank\" rel=\"noopener\">Typeshare</a>.</p>\n        <p class=\"note\">AI agents<span>since 2023</span></p>\n        <p>Since 2023 most of my work has been with AI. At Roadie I built the AI infrastructure, the MCP server and much of the context layer for agents. I build interfaces people use to work with agents and systems that keep them reliable, and I make games and media with AI. Here's a selection.</p>\n        <p class=\"intro-cta\"><a class=\"github-cta\" href=\"https://github.com/gorkamolero\" target=\"_blank\" rel=\"noopener\">Source for most of this on GitHub&nbsp;<span aria-hidden=\"true\">→</span></a></p>\n      "
  }
}};
