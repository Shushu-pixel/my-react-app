# My React App

A responsive starter homepage built with Vite, React, and TypeScript. Includes a live click counter, documentation links, keyboard focus styles, and mobile layouts.

## Requirements

- Node.js 22.12+ (22.x) or 24+; validated with Node.js 24.19.0 and npm 11.9.0.
- npm (included with Node.js).
- No environment variables, credentials, or backend services are required.

## Get started

Run these commands from the repository root:

```sh
npm install
npm run dev -- --host 0.0.0.0
```

Vite reports the development server address, normally on port 5173. Edit `src/App.tsx` and `src/App.css` to customize the homepage; changes appear through hot module replacement.

The repository's `.npmrc` uses `/tmp/my-react-app-npm-cache` so installation also works in the cloud environment with a read-only home directory. npm recreates this disposable cache when needed.

## Validate and build

```sh
npm ci          # Reproduce dependencies from package-lock.json
npm test        # Homepage and user interaction tests (Vitest + Testing Library)
npm run lint    # Oxlint
npm run build   # TypeScript checks and production bundle
npm run preview -- --host 0.0.0.0
```

The production output is in `dist/`. Preview serves that output, normally on port 4173; use a static host to deploy it. `npm run test:watch` runs tests while developing.

## Project layout

- `src/App.tsx`: homepage and interactive demo
- `src/App.css`, `src/index.css`: responsive layout and global styles
- `src/App.test.tsx`: rendering, links, and counter tests
- `public/`: static assets
- `vite.config.ts`, `vitest.config.ts`: development/build and test configuration

Generated dependencies, build output, and local files are ignored by Git. Existing Git remotes and configuration are preserved.

## shadcn/ui

Tailwind CSS v4 is integrated through `@tailwindcss/vite`. Both TypeScript and Vite resolve `@/*` to `src/*`; Vitest uses the same alias. `components.json` configures the New York style, Radix primitives, neutral CSS-variable theme, and `cn` utility package.

`src/components/ui/button.tsx` and `card.tsx` are official shadcn components. The homepage includes a working Save / Reset Card example in `src/components/component-examples.tsx`. Theme tokens live in `src/index.css`.

To add more official components:

```sh
npx shadcn@latest add @shadcn/dialog
```

The CLI requires HTTPS access to `ui.shadcn.com` and the npm registry. During initial configuration the cloud policy blocked `ui.shadcn.com`, so the setup followed the official manual installation guide and used official component files from the Git repository rather than completing `shadcn init`.

The complete official shadcn skill (21 files, including rules, references, and scripts) is installed in `.agents/skills/shadcn/`. Skill, component source, and manual installation CSS were retrieved from `shadcn-ui/ui` at commit `25af02b1b467fcd53b63e0c6d6d324c57c16ef18`. The upstream MIT license is included in `THIRD_PARTY_LICENSES/shadcn-ui.txt`.
