# Design-system verification

Verified locally on 2026-10-12. No push, deployment or publication.

## Final checks

| Command | Result |
| --- | --- |
| `pnpm build` | Pass: 24 pages; no build warnings |
| `pnpm proof` | Pass: 48 combinations; zero layout or asset failures; root alias verified |
| `pnpm parity` | Pass: 54 captures; zero differing pixels |
| `pnpm parity --exact` | Pass: 54 captures; zero differing pixels |
| `pnpm test:components` | 93 passed; 0 failed; zero screenshot tolerance |
| `pnpm tokens:check` | Pass: no errors, 193 tokens |
| `pnpm build-storybook` | Pass: 48 prerendered stories with addon-mcp |
| `pnpm storybook` | Browser-verified pinned menu, carousel advancement and compiled TextLink styles |
| `pnpm design:lint` | Exit 0: zero errors, two preserved contrast warnings |

The final component run took 30.3 seconds. Its 93 checks include 91 macOS screenshots and two menu-interaction tests. `threshold` and `maxDiffPixels` are both zero; fonts/images are ready and animations disabled. The local addon-mcp endpoint also answered an MCP initialize request with HTTP 200.

## Page parity

Text and links below match at **both** sizes. Every image has identical dimensions. Shares use zero color-distance tolerance and include antialiasing.

| Page | Text | Links | 1280px differing pixels | 390px differing pixels | Share at both sizes |
| --- | --- | --- | ---: | ---: | ---: |
| agents | Identical | Identical | 0 | 0 | 0.000000% |
| anima | Identical | Identical | 0 | 0 | 0.000000% |
| carvingen | Identical | Identical | 0 | 0 | 0.000000% |
| claude-on-discord | Identical | Identical | 0 | 0 | 0.000000% |
| contact | Identical | Identical | 0 | 0 | 0.000000% |
| creative | Identical | Identical | 0 | 0 | 0.000000% |
| datomania | Identical | Identical | 0 | 0 | 0.000000% |
| design-systems | Identical | Identical | 0 | 0 | 0.000000% |
| hotpress | Identical | Identical | 0 | 0 | 0.000000% |
| index | Identical | Identical | 0 | 0 | 0.000000% |
| infinity | Identical | Identical | 0 | 0 | 0.000000% |
| koda | Identical | Identical | 0 | 0 | 0.000000% |
| land | Identical | Identical | 0 | 0 | 0.000000% |
| mercurius | Identical | Identical | 0 | 0 | 0.000000% |
| molter | Identical | Identical | 0 | 0 | 0.000000% |
| music | Identical | Identical | 0 | 0 | 0.000000% |
| pre-ai | Identical | Identical | 0 | 0 | 0.000000% |
| saga | Identical | Identical | 0 | 0 | 0.000000% |
| sidekick | Identical | Identical | 0 | 0 | 0.000000% |
| solderpunk | Identical | Identical | 0 | 0 | 0.000000% |
| storyscript | Identical | Identical | 0 | 0 | 0.000000% |
| streamtui | Identical | Identical | 0 | 0 | 0.000000% |
| the-pulse | Identical | Identical | 0 | 0 | 0.000000% |
| workbench | Identical | Identical | 0 | 0 | 0.000000% |

## Menu parity

| Index masthead state | Text | Links | Differing pixels | Share |
| --- | --- | --- | ---: | ---: |
| 1280-menu-closed | Identical | Identical | 0 | 0.000000% |
| 1280-menu-hover | Identical | Identical | 0 | 0.000000% |
| 1280-menu-pinned | Identical | Identical | 0 | 0.000000% |
| 390-menu-closed | Identical | Identical | 0 | 0.000000% |
| 390-menu-pinned | Identical | Identical | 0 | 0.000000% |
| 390-menu-tap | Identical | Identical | 0 | 0.000000% |

No page or menu differences remained, so no diff images were produced in either initial or final parity runs. Page baselines were never regenerated.

## Components and stories

23 components; 48 stories including the Tokens catalog.

| Component / page | Story exports |
| --- | --- |
| ActionRow | Default |
| ArchiveTable | Default |
| AudioEmbed | Default |
| Carousel | Default, Next Slide |
| CaseLead | Default |
| Dot | Default, Separator, Leading, Name |
| FactsList | Default |
| Figure | Default, Image, Caption |
| Footer | Desktop, Phone |
| GitHubLink | Default |
| GroupHeading | Default |
| IntroNotes | Default |
| Job | Default |
| Masthead | Engineering, Creative, Music, Closed, Hovering, Pinned, Phone |
| MetaLine | Default |
| Narration | Default |
| PageFrame | Default |
| PointsList | Default |
| PortfoliosMenu | Closed, Hovering, Pinned, Phone |
| ProjectIndex | Default |
| Release | Default |
| TextLink | Plain Internal, Primary Internal, Plain External, Primary External, Hover, Plain Internal Hover, Primary Internal Hover, Plain External Hover |
| Tokens | Catalog |
| WorkSection | Default, With Media |

## Token inventory

| Source | Tokens |
| --- | ---: |
| tokens/color.tokens.json | 17 |
| tokens/dimension.tokens.json | 84 |
| tokens/dots.tokens.json | 6 |
| tokens/motion.tokens.json | 8 |
| tokens/number.tokens.json | 14 |
| tokens/relative.tokens.json | 61 |
| tokens/type.tokens.json | 3 |

Total: **193**. Generated outputs: `src/styles/generated/tokens.css` and `theme.css`. DESIGN.md includes a generated primary-color alias, so its projected color count is 18 rather than the 17 source colors.

## Compatibility and limits

Astro 7.3.8, Vite 8.3.4, Storybook 10.6.2, framework 1.12.0 and addon-mcp 10.6.2 are retained. The transport failure was an internal render-server shutdown race, fixed by waiting for Astro's background app readiness. A separate `viteFinal` transform compiles the framework's raw injected component styles with Tailwind. The build has the usual Storybook bundle-size advisory; the dev optimizer also reports its unresolved optional `ts-dedent` prebundle hint. Neither prevented the tested build or dev rendering.

Google DESIGN.md 0.4.0 lint reports two contrast warnings for existing colors: gradient-middle/paper **4.08:1**, gradient-end/paper **3.02:1**. The colors were preserved as required. No other lint findings need correction.

Component tests replace remote player documents with a fixed test fixture and hide native media controls; they verify our layout rather than remote media playback. Linux screenshots were not generated. Static Astro stories are prerendered; dynamic args need the dev server. The existing GitHubLink arrow remains → to preserve approved text; TextLink external variants use ↗.

## Commits and cleanup

- `632f460` — one stylesheet layer and PageFrame; old page styles removed.
- `5543bd7` — Storybook stories and Astro render-server lifecycle fix.
- `d5410be` — token-derived DESIGN.md and agent guide.
- `35cc546` — compiled Storybook styles and strict component screenshots.
- Final documentation and cleanup: the commit containing this report.

Removed `BASELINE-REPORT.md`, `proof-index.log` and six untracked one-off helpers from `scripts/`: `consolidate-styles.mjs`, `create-stories.mjs`, `extract-menu.mjs`, `migrate-page.mjs`, `migrate-sequence.mjs`, `tokenize-css.mjs`. Repeatable checks and verification records remain. Logs and build/test outputs are ignored. Only portfolio paths were staged; unrelated changes were left alone.

Run commands and architecture are documented in [README.md](README.md). No requested implementation step remains blocked; palette contrast limitations and Linux baselines remain as described above.

## Independent check by Claude (2026-10-12)

A second check, separate from the baseline harness: the current build (`dist/`) against the files the live site served before the rebuild (`~/www/gorkamolero.github.io` at 4bc8dc3). It used its own capture script, with native media controls hidden, the voice widget removed and analytics blocked. It covered 24 pages at 1280 and 390, plus the menu hover, pinned and tap states on Engineering and Agents.

- **Text and links:** identical on every capture.
- **Pixels:** identical on every capture except three, each a few pixels, all traced to noise between runs rather than the site.
  - **Agents menu, hover and pinned:** 1 pixel at the left edge of the sweep, 2/255 apart. The live site against itself shows the same 1-pixel flicker.
  - **Music at 390:** 0 to 2 pixels from run to run. One repeat showed 1,682 pixels (0.17%), all inside Spotify's embedded player, whose own web font had or hadn't loaded yet ("Gitano de Palo" in bold or regular). That is third-party content. The site's own pixels match.
- **AGENTS.md:** read and corrected so it points to the normal publish process instead of the migration-time ban on publishing.
- **DESIGN.md:** lint passes with no errors. Its two contrast warnings, gradient-middle 4.08:1 and gradient-end 3.02:1 against paper, are the vermilion-to-amber gradient Gorka chose for the Portfolios and GitHub links. They're accepted as they are.
