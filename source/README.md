# Portfolio design system

The source of Gorka Molero's portfolio. Astro 7.3.8 generates 24 static pages;
`build.format: 'file'` preserves URLs such as `index.html` and `koda.html`.
The design-system rebuild preserves the approved words, links and appearance.
Read [DESIGN.md](DESIGN.md) for the design rules and [AGENTS.md](AGENTS.md) before
changing anything. This work is local: do not publish or push it.

## Commands

From `portfolio/`, with Node 24 and pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev                   # Astro development
pnpm build                 # build tokens, then the site into dist/
pnpm preview               # preview dist/
pnpm tokens:check          # Terrazzo validation
pnpm proof                 # 24 pages × desktop/phone: layout, links and assets
pnpm parity                # exact text/links; at most 0.1% different pixels
pnpm parity --exact        # require zero differing pixels
pnpm storybook             # Storybook dev at localhost:6006; no browser auto-open
pnpm build-storybook       # local static documentation in storybook-static/
pnpm test:components       # test the built Storybook; starts/stops its own server
pnpm design:sync            # regenerate DESIGN.md front matter from DTCG tokens
pnpm design:lint            # verify token projection, then Google's CLI lint
```

`test:components` requires a current `build-storybook`. Its local server uses
127.0.0.1:6007 and refuses to reuse an unrelated running server. Browser binaries
use `PLAYWRIGHT_BROWSERS_PATH` or `.cache/ms-playwright`, as the page proof does.
If the bundled browser is absent:

```sh
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright pnpm exec playwright install chromium
```

## Source and ownership

- `tokens/*.tokens.json`: 193 DTCG 2025.10 tokens; the editable design values.
- `terrazzo.config.mjs`: Terrazzo 2.7.1 generates custom properties and the
  Tailwind v4 theme. OKLCH source colors serialize to the original sRGB channels
  so color interpolation and rasterization stay identical.
- `src/styles/generated/{tokens,theme}.css`: generated; do not edit by hand.
- `src/styles/global.css`: the layer order, generated tokens, Tailwind utilities,
  and the shared masthead/menu scope. Preflight is intentionally omitted.
- `src/components/*.astro`: the single owner for each repeated piece of UI and
  its styles. Page variants retain the original sizes and breakpoints.
- `src/layouts/Base.astro`: document metadata, Google Fonts, analytics, shared
  footer and slots for the existing tiny voice widget on index and creative.
- `src/components/PageFrame.astro`: sheet, page context and foundational styles.
- `src/pages/*.astro`: component composition, original copy and links. Body
  content is no longer stored in `content` strings. Existing metadata/widget
  fragments remain in the layout slots.
- `public/`: unchanged assets. Existing menu and carousel JavaScript stays with
  its component; this rebuild adds no new site interactions.
- `src/stories/`, `.storybook/`: local component documentation and tooling.
- `tests/components/`: Playwright screenshots and interaction checks.

## Tokens

| File in `tokens/` | Count | Contents |
| --- | ---: | --- |
| `color.tokens.json` | 17 | Paper, ink, soft ink, rule, vermilion, gradient and translucent surfaces |
| `type.tokens.json` | 3 | Display, italic display and body families |
| `dimension.tokens.json` | 84 | px/rem dimensions, font sizes, spacing, borders and radii |
| `relative.tokens.json` | 61 | em, percentage and viewport measures represented as numbers with units in their names |
| `number.tokens.json` | 14 | Line heights and font weights |
| `dots.tokens.json` | 6 | Separator, leading and name-dot geometry |
| `motion.tokens.json` | 8 | Sweep, easing, hover grace and transition durations |

The Tokens story reads all seven JSON files directly and shows color swatches,
type, metrics, spacing, relative measures, dots and motion samples. DESIGN.md's
front matter is a generated projection for Google's format; it is not another
editable source. `design:lint` rejects a stale projection.

## Components and stories

All 23 components have stories: 48 stories in total, including Tokens.

| Component | Stories / states |
| --- | --- |
| TextLink | Plain/primary × internal/external; hover for every combination |
| Masthead | Engineering, creative, music, closed, hovering, pinned, phone |
| PortfoliosMenu | Closed, hovering, pinned, phone, in the real masthead context |
| Dot | Meta, separator, leading, name |
| WorkSection | Without media; with media |
| Figure | Video, image, caption |
| Carousel | First slide; next slide |
| Footer | Desktop; phone |
| ActionRow | Existing source and case-study links |
| ArchiveTable | Existing archive rows |
| AudioEmbed | Narrator audio and note |
| CaseLead | Heading, introduction and metadata |
| FactsList | Labeled facts |
| GitHubLink | Existing gradient source link |
| GroupHeading | Section-group heading |
| IntroNotes | Margin notes and introduction |
| Job | Work-history entry |
| MetaLine | Eyebrow metadata |
| Narration | Quote and source |
| PageFrame | Sheet foundation |
| PointsList | Marked list |
| ProjectIndex | Linked project rows |
| Release | Music release and player |

Storybook 10.6.2 uses `@storybook-astro/framework` 1.12.0 and includes
`@storybook/addon-mcp` 10.6.2. Both build and development rendering are verified.
`storybook-static/` is ignored and has not been deployed. Static Astro stories
are prerendered: changing args in a static build cannot rerun server rendering;
use the dev server for that.

Two compatibility fixes are confined to Storybook tooling:

1. `astro-server-lifecycle.mjs` waits for Astro 7's background dev-app startup
   before an internal Vite server closes. Astro's own `closeContainer` does this;
   the framework's direct close otherwise disconnects an in-flight `fetchModule`.
2. `tailwind-component-styles.mjs`, installed through `viteFinal`, compiles the
   raw style strings emitted by the framework's component marker. That marker
   bypasses Vite's CSS pipeline, so loading the Tailwind Vite plugin alone leaves
   `@apply` unprocessed. The transform uses the same Tailwind 4.3.3 compiler.

Tailwind is loaded once from `astro.config.mjs`; it is not added again in
`viteFinal`. The preview imports shared component styles for HTML-slot examples
and allows PageFrame's layer to supply gutters instead of Storybook's reset.
The menu and carousel reuse their existing scripts as inline JavaScript so the
Container API can execute them in both dev and static stories.

Upstream references: [README](https://github.com/storybook-astro/storybook-astro),
[Astro 7 demo configuration](https://github.com/storybook-astro/storybook-astro/tree/develop/integration/astro7/.storybook).

## Page parity and proof

`baseline/` is the preserved, ignored pre-migration reference. `scripts/capture.mjs`
serves `dist/` and captures every page at 1280×900 and 390×844, plus index menu
closed/pinned at both sizes, desktop hover and phone tap: 54 captures.

Capture waits for fonts and images, pauses media, disables animations and removes
the ElevenLabs widget. Capture-only CSS hides native media controls so buffering
chrome cannot change screenshots. Analytics/widget requests are blocked only in
the harness. Original images, posters and other embeds remain in page parity.

`parity/results.json` records exact visible text, link href/target/rel equality,
dimensions, differing pixels and share for each capture. Nonzero diffs create
`*-diff.png`; inspect every one. Pixel comparison includes antialiasing and uses
zero color-distance tolerance. `--exact` tightens the share gate from 0.1% to zero.
The separate `proof/results.json` audits 48 combinations at 1280px and 375px plus
the root alias, checking overflow, photo, assets, current link and external links.

```sh
node scripts/parity.mjs index   # one page and its menu states
pnpm proof index               # targeted layout/asset audit
pnpm baseline                  # refuses to replace the original without --force
```

Do not regenerate page baselines to accept a regression.

## Component screenshots

`pnpm test:components` runs 93 checks: 91 full-page screenshots across the 48
stories, plus desktop/phone menu behaviour. Every component is covered at 1280px
and 390px; dedicated phone stories run only at 390px and hover-only menu stories
only on desktop. Screenshots wait for `document.fonts.ready` and decoded images,
disable animations, and use `threshold: 0` and `maxDiffPixels: 0`.

The suite also checks browser errors, missing local assets, compiled component
CSS, external arrows, actual phone taps, carousel advancement, hover grace,
tolerance, pinning, outside-click close and Escape state. Third-party player
contents use the fixed `tests/fixtures/embed.html`; media is paused and native
controls hidden, matching the page capture boundary. These tests cover our
component layout, not remote-player functionality or audio/video playback.

Snapshots in `tests/components/__screenshots__/darwin/` are **macOS baselines**.
Linux CI needs its own baselines and matching browser/fonts. Intentionally
update them with `pnpm test:components:update` only after reviewing the change.
Run `pnpm test:components` again without update to prove stability. Failures and
diffs go to ignored `test-results/`.

## Validation and cleanup

Google's DESIGN.md 0.4.0 lint reports zero errors and two preserved palette
warnings: gradient-middle on paper is 4.08:1 and gradient-end is 3.02:1, below
4.5:1. The colors were not changed. See [DESIGN.md](DESIGN.md) for the rationale
and [VERIFICATION.md](VERIFICATION.md) for the final capture table and evidence.

Removed the one-off migration helpers: `consolidate-styles.mjs`,
`create-stories.mjs`, `extract-menu.mjs`, `migrate-page.mjs`,
`migrate-sequence.mjs` and `tokenize-css.mjs`. Removed `BASELINE-REPORT.md` and
`proof-index.log`. Repeatable capture, parity, proof, token-doc generation and
Storybook-serving scripts remain. Logs, builds and test output are ignored.
