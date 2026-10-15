import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t;function n(){return(n=e((()=>{(function(){if(typeof document>`u`)return;let e=document.head.querySelectorAll(`style[data-astro-build]`);for(let t of e)if(t.getAttribute(`data-astro-build`)===`/Users/gorkolas/Developer/job-hunt-command-center/portfolio/src/components/Steps.astro:0`)return;let t=document.createElement(`style`);t.setAttribute(`data-astro-build`,`/Users/gorkolas/Developer/job-hunt-command-center/portfolio/src/components/Steps.astro:0`),t.textContent=`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer components {
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps {
      display: grid;
      counter-reset: step;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--dimension-1-6-rem) var(--dimension-1-rem);
      margin: var(--dimension-1-6-rem) 0 0;
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps.pair {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps + p, .steps + .plate {
      margin-top: var(--dimension-1-6-rem);
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps .step {
      counter-increment: step;
      margin: 0;
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps .step .shot {
      margin: 0;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: var(--color-surface-10);
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps .step .shot img, .steps .step .shot video {
      width: calc(var(--relative-100-percent) * 1%);
      height: calc(var(--relative-100-percent) * 1%);
      object-fit: contain;
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps .step figcaption {
      margin: var(--dimension-0-6-rem) 0 0;
      color: var(--ink-soft);
      font-style: italic;
      font-size: var(--dimension-1-rem);
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    .steps .step figcaption::before {
      content: counter(step) ". ";
      color: var(--vermilion);
      font-family: var(--display);
      font-style: normal;
    }
  }
  @scope (html:has(body:not([data-page="index"], [data-page="creative"], [data-page="music"]))) {
    @media (max-width: 640px) {
      .steps, .steps.pair {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  }
}
`,document.head.appendChild(t)})(),t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`/Users/gorkolas/Developer/job-hunt-command-center/portfolio/src/components/Steps.astro`})))()}var r,i,a;function o(){return(o=e((()=>{n(),r={title:`Components/Steps`,component:t,parameters:{page:`carvingen`}},i={args:{class:`steps`,slots:{default:`
<figure class="step"><div class="shot"><img src="./assets/carvingen/owl-1-first-image.jpg" alt="A great horned owl landing on a log." /></div><figcaption>A text prompt and nothing else.</figcaption></figure>
<figure class="step"><div class="shot"><img src="./assets/carvingen/owl-2-as-wood.jpg" alt="The owl as pale wood." /></div><figcaption>The same owl in one block of pale, unstained wood.</figcaption></figure>
<figure class="step"><div class="shot"><img src="./assets/carvingen/owl-3a-wings-up.jpg" alt="The owl with its wings raised." /></div><figcaption>Wings raised higher. The one I kept.</figcaption></figure>
`}}},a=[`Default`]})))()}o();export{i as Default,a as __namedExportsOrder,r as default};