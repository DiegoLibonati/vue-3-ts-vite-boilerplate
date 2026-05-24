# Vue 3 Ts Vite Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Vue 3 Ts Vite Boilerplate** is a production-ready starting point for building single-page applications with Vue 3, TypeScript, and Vite. It is not a UI kit or a framework — it is the foundation you clone once and stop rebuilding from scratch on every new project.

**The problem it solves:** every Vue 3 + TypeScript project starts with the same repetitive decisions — how to structure folders, how to wire up routing, where to put types, how to handle shared state without reaching for a heavy solution, how to set up linting and formatting so they actually block bad code before it reaches the repo. This boilerplate answers all of those decisions upfront, with a consistent, lightweight architecture that scales to real applications without introducing unnecessary complexity.

**What it includes:**

- **Vite 7** as the build tool — instant dev server startup, fast HMR, and optimized production builds out of the box.
- **Vue 3 + TypeScript 5** — strict typing enforced throughout; no `any`, explicit return types required, consistent type imports. All components use `<script setup>` syntax for maximum type inference and ergonomics.
- **Vue Router v4** with lazy-loaded routes for automatic code splitting. Includes a wildcard catch-all that drives 404 or redirect behavior from an environment variable, making the fallback behavior configurable without code changes.
- **Pinia** for shared state — demonstrated with a counter store using the Composition API that shows how to define state, computed properties, and actions in a single, type-safe module.
- **provide / inject pattern** for scoped shared state — demonstrated with a theme toggle that shows how to scope a provider to the root component, type injection keys with `InjectionKey`, and consume them safely in child components.
- **Service layer** — plain async modules that wrap `fetch`, throw on non-ok responses, and keep all API communication out of components.
- **Centralized type system** — all TypeScript interfaces live in `src/types/`, split by concern (props, app models, responses, env variables). Environment variables are parsed and typed once in `src/constants/envs.ts`; raw `import.meta.env` access does not spread across the codebase.
- **Semantic HTML and accessibility** — components use `<article>`, `<address>`, `<nav>`, `<output aria-live>`, `role="status"`, `role="alert"`, and `rel="noopener noreferrer"` by default, not as an afterthought.
- **Vitest + Testing Library** — full test suite with `@testing-library/vue`, `@vue/test-utils`, `msw`, and `@testing-library/user-event`. Tests mirror the `src/` structure, use a typed factory pattern, and cover happy paths, edge cases, async flows, and error states. Coverage threshold enforced at 70% across branches, functions, lines, and statements.
- **ESLint + Prettier + Husky + lint-staged** — pre-commit hooks block commits with linting errors and auto-format staged files. No manual formatting steps required.

**How to use it:**

1. Clone the repository and install dependencies.
2. Rename the project in `package.json` and update the HTML title in `index.html`.
3. Set your environment variables following `.env.example`.
4. Replace the template pages, components, services, stores, and types with your own domain logic — the folder structure, routing setup, type conventions, and tooling stay exactly as they are.

## Technologies Used

1. Vue JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3
6. Docker
7. Nginx

## Libraries Used

### Dependencies

```
"vue": "^3.4.29"
"vue-router": "^4.5.1"
"pinia": "^2.1.7"
"oh-vue-icons": "^1.0.0-rc3"
```

### DevDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@testing-library/vue": "^8.1.0"
"@types/node": "^22.0.0"
"@vitejs/plugin-vue": "^6.0.0"
"@vue/test-utils": "^2.4.6"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-vue": "^9.32.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jsdom": "^26.1.0"
"lint-staged": "^15.0.0"
"msw": "2.10.4"
"prettier": "^3.0.0"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
"vitest": "^3.2.0"
"vue-eslint-parser": "^9.4.3"
"vue-tsc": "^2.2.0"
```

## Getting Started

With the stack and dependencies in mind, set up the project locally:

1. Clone the repository.
2. Navigate to the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the example env file and adjust values for your environment (see [Env Keys](#env-keys) for the available variables):

   ```bash
   cp .env.example .env
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The application will open automatically at `http://localhost:3000`.

### Pre-Commit for Development

Before committing, the project enforces code quality through pre-commit hooks. Husky runs `lint-staged` on every commit, which executes ESLint on staged `.ts`/`.vue` files and Prettier on `.ts`, `.vue`, `.css`, `.json` and `.md` files. Commits with linting errors are blocked.

**ESLint** is configured with TypeScript strict rules and Vue-specific rules:

- Explicit return types required
- No `any` type allowed
- Consistent type imports
- No unused variables
- Vue component naming and `defineProps` / `defineEmits` ordering enforced

**Prettier** enforces consistent formatting:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)
- 100 character line width

You can also run the tools manually outside of the commit flow:

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run lint`         | Check for linting errors           |
| `npm run lint:fix`     | Fix linting errors                 |
| `npm run lint:all`     | Fix linting all (src + tests)      |
| `npm run format`       | Format code with Prettier          |
| `npm run format:check` | Check code formatting              |
| `npm run format:all`   | Format Prettier (src + tests)      |
| `npm run type-check`   | Type-check the app with TypeScript |

## Env Keys

Environment variables are parsed and typed once in `src/constants/envs.ts`; raw `import.meta.env` access is not allowed elsewhere in the codebase.

| Key                                 | Description                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS` | If `true`, redirects to home when route doesn't exist. If `false`, shows 404 page. |
| `VITE_TEMPLATE_API_URL`             | Users API URL.                                                                     |

Example `.env`:

```bash
VITE_REDIRECT_IF_ROUTE_NOT_EXISTS=false
VITE_TEMPLATE_API_URL=https://jsonplaceholder.typicode.com
```

## Project Structure

With the app running and configured, here is how the source is organized:

```
vue-3-ts-vite-boilerplate/
├── __tests__/                      # Test suite
│   ├── __mocks__/                  # Shared mock data and module mocks
│   ├── components/                 # Tests for reusable components
│   ├── pages/                      # Tests for page components
│   ├── services/                   # Tests for service modules
│   ├── stores/                     # Tests for Pinia stores
│   └── vitest.setup.ts             # Vitest global setup (jest-dom, MSW lifecycle)
├── public/                         # Static assets served as-is
│   ├── favicon.ico
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── AppAction/              # Button wrapper component
│   │   ├── AppLink/                # Router/external link component
│   │   └── UserCard/               # User profile card component
│   ├── constants/                  # App-wide constant values
│   │   ├── envs.ts                 # Environment variable constants
│   │   ├── injectionKeys.ts        # Typed InjectionKey definitions
│   │   └── vars.ts                 # General constants
│   ├── pages/                      # Route-level page components
│   │   ├── AboutPage/
│   │   ├── ContextPage/
│   │   ├── HomePage/
│   │   ├── NotFoundPage/
│   │   ├── PiniaPage/
│   │   ├── UserPage/
│   │   └── UsersPage/
│   ├── router/                     # Routing configuration
│   │   └── index.ts                # Route definitions and lazy loading
│   ├── services/                   # API communication layer
│   │   └── userService.ts          # User resource API calls
│   ├── stores/                     # Pinia store modules
│   │   └── counter.ts              # Counter store (Composition API)
│   ├── styles/                     # Global CSS
│   │   └── global.css              # Design tokens, reset, and utilities
│   ├── types/                      # TypeScript type definitions
│   │   ├── app.ts                  # Domain model types
│   │   ├── props.ts                # Component prop types
│   │   └── responses.ts            # API response types
│   ├── App.vue                     # Root component (theme provide)
│   ├── main.ts                     # App entry point
│   └── vite-env.d.ts               # Vite environment type declarations
├── .editorconfig                   # Editor formatting rules
├── .env.example                    # Example environment variables
├── .github/workflows/ci.yml        # GitHub Actions CI pipeline
├── .npmrc                          # npm engine-strict config
├── .nvmrc                          # Node version for nvm
├── .vscode/extensions.json         # Recommended VS Code extensions
├── eslint.config.js                # ESLint flat config
├── index.html                      # HTML entry point
├── tsconfig.json                   # TypeScript config references
├── tsconfig.base.json              # Base TypeScript compiler options
├── tsconfig.app.json               # App-specific TypeScript config
├── tsconfig.test.json              # Test-specific TypeScript config
├── vite.config.ts                  # Vite build config
└── vitest.config.js                # Vitest test config
```

| Folder / File          | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `__tests__/`           | All test files, grouped by source category                         |
| `__tests__/__mocks__/` | Reusable mock data (users, MSW handlers and server, styles, files) |
| `src/components/`      | Presentational components reused across pages                      |
| `src/constants/`       | Centralized constants — env vars and general app values            |
| `src/pages/`           | One folder per route; each `.vue` file uses scoped styles          |
| `src/router/`          | Route declarations with lazy loading and wildcard fallback         |
| `src/services/`        | `fetch`-based API modules, one per resource                        |
| `src/stores/`          | Pinia store modules using the Composition API                      |
| `src/styles/`          | Global design tokens, CSS reset, and utility classes               |
| `src/types/`           | TypeScript interfaces and types, split by concern                  |

## Architecture & Design Patterns

The folder structure above maps directly onto the architectural layers described in this section.

### Component Architecture

The UI is split into two layers:

- **Pages** (`src/pages/`) — route-level components. Each page owns its own state, data fetching, and layout. They are never reused across routes.
- **Components** (`src/components/`) — presentational, stateless building blocks. They receive all data via props and have no knowledge of routing or services.

This separation keeps pages focused on orchestration and components focused on rendering.

### Layered Responsibility

```
main.ts → App.vue → Router → Page → Component
                               ↓
                           Service → fetch API
                               ↓
                           Store (Pinia)
```

Each layer has a single responsibility:

| Layer         | Responsibility                                     |
| ------------- | -------------------------------------------------- |
| `router/`     | Declare routes, lazy-load pages, handle fallback   |
| `pages/`      | Fetch data, manage local state, compose layout     |
| `components/` | Render UI from props, emit events via callbacks    |
| `services/`   | Execute HTTP requests, parse and return typed data |
| `stores/`     | Manage shared reactive state with Pinia            |
| `constants/`  | Centralize configuration values                    |

### State Management

Local component state is handled with `ref` and `reactive` inside `<script setup>`. For shared state the project provides two patterns:

**Pinia store** — demonstrated with a counter (`src/stores/counter.ts`). Uses the Composition API store format: `ref` for state, `computed` for derived values, and plain functions for actions. The store is typed automatically and consumed directly in components.

**provide / inject** — demonstrated with a theme toggle in `App.vue`. The root component provides a reactive value typed with `InjectionKey<T>`, and child components inject it via a safe helper that throws if called outside the provider tree — fail-fast guard equivalent to React's context pattern.

### Routing

Vue Router v4 with `createWebHistory` (HTML5 history mode). Route structure:

- All routes are **lazy-loaded** via dynamic `import()`, enabling automatic per-route code splitting.
- A catch-all `/:pathMatch(.*)*` route drives the 404 behavior from the `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS` env flag — either redirecting to `/home` or rendering the `NotFoundPage` — making the fallback configurable without code changes.

### Service Layer

Services are plain objects with async methods that call `fetch` directly. They throw on non-`ok` responses so callers can handle errors uniformly with `try/catch`. There is no HTTP client abstraction — the native `fetch` API is sufficient for the template's scope.

### Type Safety

All types live in `src/types/`, split by concern (props, app models, responses). Components and stores import only the interfaces they need. Env variables are parsed once in `src/constants/envs.ts` and consumed as a typed object — raw `import.meta.env` access is never scattered across the codebase. TypeScript compilation is split into `tsconfig.app.json` and `tsconfig.test.json` so test-only globals do not leak into the app bundle.

### Semantic HTML & Accessibility

Components use semantic elements over generic `<div>` wrappers:

- `<article>` for self-contained cards, `<header>`/`<footer>` for card sections, `<address>` for contact info.
- `<nav aria-label="...">` for link groups, `<output aria-live="polite">` for live regions.
- `role="status"` / `role="alert"` on loading and error states.
- `rel="noopener noreferrer"` on all `target="_blank"` links.
- `type="button"` on every `<button>` to prevent accidental form submission.

## Testing

Tests mirror the `src/` folder structure under `__tests__/`. Each test file uses `@testing-library/vue` to render components in a realistic DOM environment and asserts through accessible roles and semantic queries — never by implementation details.

- **Components** — rendered in isolation with typed prop overrides; assertions on DOM structure and accessible roles.
- **Pages** — wrapped with `createTestingPinia` where Pinia is involved; services are mocked via **MSW** (Mock Service Worker) instead of manual fetch stubs, keeping mocks close to real network behavior.
- **Stores** — tested directly via `setActivePinia(createPinia())`, asserting initial state, computed values, and action side effects.
- **Services** — API calls intercepted by MSW handlers; happy path and error responses both covered.
- **Async assertions** — prefer `findBy*` over manual `waitFor(() => expect(getBy*...))`.

Coverage threshold is enforced at **70%** across branches, functions, lines, and statements.

### Run tests

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run test`          | Run tests once                 |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## Security Audit

Once the test suite is green, audit dependencies and run a security check before building.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Build

With tests passing and the security audit clean, generate an optimized production bundle:

```bash
npm run build
```

Vite runs `vue-tsc` first to type-check the app, then outputs the compiled static assets to `dist/`. To verify the build locally before deploying:

```bash
npm run preview
```

`preview` serves the contents of `dist/` on a local port so you can confirm the production bundle behaves as expected.

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                           ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │─▶│   build-docker   │
│  ESLint · tsc        │  │     Vitest       │  │ vue-tsc + vite   │  │ dev + prod images │
└──────────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

All four jobs run sequentially — each depends on the previous one passing.

### Jobs

1. **`lint-and-audit`** — installs dependencies, runs `npm run lint` (ESLint), and type-checks with `npm run type-check` (`tsc`).
2. **`testing`** — runs the full Vitest test suite with `npm run test`.
3. **`build`** — produces the production bundle via `vue-tsc` + `vite build`.
4. **`build-docker`** — builds both the development (`Dockerfile.development`) and production (`Dockerfile.production`) Docker images to verify they compile.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build

# build-docker
docker build -f Dockerfile.development -t app:dev .
docker build -f Dockerfile.production -t app:prod .
```

## Production

Production deploys the contents of `dist/` using a **multi-stage Docker image** served by **nginx** running as a **non-root user** (`appuser`, UID 1001). Before promoting an image, make sure you have already run [Testing](#testing), [Security Audit](#security-audit), and [Build](#build) — this section only covers what is **new** to the production pipeline: production env config and Docker distribution.

### Configure production env

Create a production env file based on `.env.example` and adjust values for the target environment:

```bash
cp .env.example .env.production
```

Vite reads these variables at compile time during `npm run build` and bakes the parsed values into the static bundle.

### Architecture

```
Stage 1 — builder : node:22-alpine  →  npm ci  →  npm run build  →  dist/
Stage 2 — runner  : nginx:stable-alpine  →  serves dist/ on port 8080
```

No Node.js or source code ends up in the final image — only nginx and the compiled static files.

### Run with Docker Compose (Prod)

```bash
docker compose -f prod.docker-compose.yml up --build
```

The app is available at `http://localhost:3000` (host port 3000 → container port 8080).

### Build and run manually (Prod)

```bash
docker build -f Dockerfile.production -t my-app:prod .
docker run -p 3000:8080 my-app:prod
```

### What the production image includes

| Feature                  | Detail                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Non-root execution**   | nginx runs as `appuser` (UID 1001); port 8080 avoids privileged binding                                              |
| **Gzip compression**     | Enabled for JS, CSS, JSON, SVG, and font files ≥ 1 KB                                                                |
| **Static asset caching** | JS, CSS, images, and fonts served with `Cache-Control: public, max-age=31536000, immutable`                          |
| **SPA routing**          | All unmatched paths fall through to `index.html` so Vue Router handles navigation client-side                        |
| **API proxy**            | Requests to `/users` are proxied to the upstream API — no direct cross-origin requests from the browser              |
| **Security headers**     | `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` |
| **Health check**         | Docker polls `http://localhost:8080` every 30 s (3 retries, 5 s timeout, 10 s start grace)                           |

### Development with Docker (Dev)

A separate Compose file is provided for local development with hot-module replacement, as an alternative to the local `npm run dev` flow described in [Getting Started](#getting-started):

```bash
docker compose -f dev.docker-compose.yml up --build
```

Source files are bind-mounted into the container so changes reflect immediately without rebuilding. `node_modules` is kept in an anonymous volume to avoid conflicts with host-installed binaries.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/vue-3-ts-vite-boilerplate`](https://www.diegolibonati.com.ar/#/project/vue-3-ts-vite-boilerplate)
