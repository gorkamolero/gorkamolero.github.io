# Portfolio design system

Read [DESIGN.md](DESIGN.md) before changing styles or components. Its front
matter is generated from [tokens/](tokens/); never edit it independently.
The DTCG token files are the source of truth. `pnpm tokens:build` generates
CSS variables and the Tailwind v4 theme. `pnpm design:sync` updates DESIGN.md.

Components live in `src/components/`; compose them in `src/pages/`. Keep copy,
links, entities, URLs, assets, menu behaviour and the existing client scripts.
`Base.astro` owns fonts, analytics, widgets' slots and footer. `PageFrame.astro`
owns page context. See [README.md](README.md) for the structure and commands.

Run `pnpm storybook` for all component states and the token catalog. Build it
with `pnpm build-storybook`; the output is local and ignored. Tests run against
that static build, not a development server.

Required checks: `pnpm build`, `pnpm tokens:check`, `pnpm proof`, `pnpm parity`,
`pnpm parity --exact`, `pnpm design:lint`, and `pnpm test:components`.
Text and links must be identical to the preserved baseline. The migration
pixel gate is 0.1%; report exact differences and inspect all diff images.
Component screenshots use zero thresholds. Review baseline updates manually;
do not overwrite baselines just to make a check pass.

Work only inside `portfolio/`, stage and commit by explicit path, and leave
other working-tree changes alone. Publishing follows
`../.claude/skills/publish-portfolio/SKILL.md`: build, copy `dist/*.html` and
`dist/_astro/` into `~/www/gorkamolero.github.io`, and push it as gorkamolero.
Never publish a change Gorka didn't ask for.
