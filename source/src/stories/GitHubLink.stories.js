import Component from '../components/GitHubLink.astro';
export default {title:'Components/GitHubLink', component:Component, parameters:{page:"index"}};
export const Default = {args:{
  "class": "github-cta",
  "href": "https://github.com/gorkamolero",
  "target": "_blank",
  "rel": "noopener",
  "slots": {
    "default": "Source for most of this on GitHub&nbsp;<span aria-hidden=\"true\">→</span>"
  }
}};
