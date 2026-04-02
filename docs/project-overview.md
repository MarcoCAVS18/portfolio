# Portfolio — Project Overview

Complete documentation of how this project is built, structured, and why each decision was made.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite 6 | UI framework and build tool |
| TailwindCSS v4 | Styling via `@tailwindcss/vite` plugin |
| Firebase (Firestore + Analytics) | Database and analytics |
| Framer Motion | Animations |
| lucide-react | Icons |
| clsx | Conditional class merging |
| react-intersection-observer | Scroll-triggered visibility |

### Tailwind v4 specifics

No `tailwind.config.js` and no PostCSS CLI. The plugin is added directly to Vite:

```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

The CSS entry uses a single import instead of the old `@tailwind` directives:

```css
/* globals.css */
@import "tailwindcss";
```

---

## Folder Structure

```
src/
  components/
    cards/          ProjectCard, FeaturedProjectCard, TimelineCard, ToolCard
    layout/         Container, Grid, Navbar, Section
    sections/       Hero, Projects, Tools, Timeline, Contact
    ui/             Button, Card, Badge, Chip, IconBox, SectionTitle,
                    Divider, StackList, BrutalistFrame, BrutalistLoader,
                    Modal, SocialButton, Shape, SceneDecor
  data/             status.js (hardcoded status, location)
  hooks/            useScrollSpy, useIntersectionReveal, useProjects,
                    useTools, useMobile
  pages/            Home.jsx (renders all sections)
  services/
    firebase/       firebaseConfig, projectsService, toolsService, contactService
  styles/           globals.css
  utils/            cn.js, formatYear.js, greeting.js
docs/
  project-overview.md   (this file)
  contacts-dashboard-plan.md
scripts/
  seed.js           one-time Firestore data seeding
```

---

## Design System — Neubrutalism

The style is defined in two CSS classes in `globals.css`:

```css
.card-brutal {
  border: 3px solid black;
  border-radius: 14px;
  box-shadow: 6px 6px 0px black;
}

.btn-brutal {
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 3px 3px 0px black;
}
```

Rules applied everywhere:
- No emojis
- No rounded corners beyond the card-brutal radius
- Black borders are always 3px solid
- Yellow (`#facc15`) is the accent color
- lucide-react for all icons
- Framer Motion for all animations

---

## Firebase

### Setup

`firebaseConfig.js` initializes the app and exports the instance. All credentials come from environment variables — never hardcoded.

```js
import.meta.env.VITE_FIREBASE_API_KEY  // Vite reads from .env
```

### Collections

**`projects`**
Each document represents a project. Fields:
- `title`, `description` (string)
- `stack` (array of strings)
- `demoUrl`, `githubUrl`, `preview`, `logo` (strings, nullable)
- `featured` (boolean) — the one featured project is separated from the grid
- `order` (number) — controls display order, sorted client-side

**`tools`**
Each document represents a tool in the Tools section. Fields:
- `label` (string) — display name
- `icon` (string) — lucide-react icon name, e.g. `"Atom"`
- `order` (number)

**`contacts`**
Written by the contact form, never read from the client. Fields:
- `name`, `email`, `message` (string)
- `createdAt` (Firestore serverTimestamp)

### Services

Each collection has its own service file:

```
projectsService.js  →  getProjects()
toolsService.js     →  getTools()
contactService.js   →  submitContact({ name, email, message })
```

`getProjects()` and `getTools()` fetch all docs and sort by `order` client-side. `submitContact()` writes to the `contacts` collection with `addDoc`.

### Hooks

Data from Firebase is consumed through custom hooks:

```js
const { featured, projects, loading, error } = useProjects()
const { tools, loading, error } = useTools()
```

`useProjects` splits the results: the document with `featured: true` becomes the `FeaturedProjectCard`, the rest fill the grid.

### Security Rules

```
projects, tools  →  read: true,  write: false
contacts         →  read: false, write: create only (with field validation)
```

The `contacts` write rule validates that `name`, `email`, and `message` are non-empty strings, `email` contains `@` and `.`, and `message` is under 2000 characters. No update or delete is allowed.

Rules are deployed with:
```bash
firebase deploy --only firestore:rules
```

Project is linked via `.firebaserc`:
```json
{ "projects": { "default": "portfolio-51d0e" } }
```

### Seeding

`scripts/seed.js` populates `tools` and `projects` from hardcoded data. It uses `firebase/firestore/lite` (the lightweight Node-compatible SDK) and reads credentials from `.env` via Node's `--env-file` flag.

```bash
npm run seed   # runs: node --env-file=.env scripts/seed.js
```

The script writes with retry logic (up to 5 attempts, exponential backoff) to handle Firestore rule propagation delays after deploy.

---

## Sections

### Hero

- Two-column grid (photo right, text left on desktop; stacked on mobile)
- Smart greeting: reads `navigator.language` and current hour to show a localized greeting with a lucide icon (`Sunrise`, `Sun`, `Sunset`, `Moon`)
- Typewriter effect cycling through roles: Developer, Designer, Cellar Hand, Housekeeper, Grain Handler, A bit of everything
- The typewriter is a self-contained hook `useTypewriter` with configurable typing/deleting speeds and pause durations
- Location badge links to Google Maps (exact pin for Blenheim, New Zealand)
- Working On badge links to orary.app
- Photo entrance is a one-time animation (no loop)
- Decorative squares (`Shape`) and SVG patterns (`SceneDecor`) in the background

### Projects

- Reads from Firestore `projects` collection via `useProjects`
- The document with `featured: true` renders as `FeaturedProjectCard` (full-width, prominent)
- The rest render in a 3-column `Grid` as `ProjectCard`
- Shows animated skeleton placeholders while loading

### Tools

- Reads from Firestore `tools` collection via `useTools`
- `icon` field is a string (e.g. `"Atom"`) mapped to a lucide component via `iconMap`
- Each tool renders as `IconBox` with a Framer Motion bubble animation on hover (desktop) and tap (mobile)
- `select-none` prevents text selection on tap

### Timeline

- Data is hardcoded in `src/data/timeline.js`
- Renders `TimelineCard` components in sequence

### Contact

- Form with name, email (side by side on desktop), and message
- On submit calls `submitContact()` — writes to Firestore `contacts`
- Status states: `idle`, `loading`, `success`, `error`
- Success state replaces the form with a confirmation panel
- "How do I see your message?" button (gray, no border, inline with submit) opens a multi-step modal:
  - Step 1: Firestore document preview showing the exact fields received
  - Step 2: Placeholder for the future custom dashboard screenshot
- Social buttons (WhatsApp, Instagram, LinkedIn, GitHub) on the right — stacked vertically on desktop, side by side on mobile

---

## Reusable UI Components

### Shape

Animated decorative square. Used across all sections.

```jsx
<Shape color="yellow" size={40} animation="rotate" delay={0} className="top-6 right-4" />
```

Props: `color` (yellow / black / white / outline), `size` (px), `animation` (rotate / float / oscillate / spin / none), `delay`, `className` for absolute positioning.

### SceneDecor

Renders SVG decorations (spirals, dashed lines, dot grids) as a single `absolute inset-0` layer so it never interferes with grid or flex layouts.

```jsx
<SceneDecor variants={['spiral-tl', 'lines-br', 'dots-tr']} />
```

Available variants: `spiral-tl/tr/bl/br`, `lines-tl/tr/bl/br`, `dots-tl/tr/bl/br`. Spirals are real Archimedean curves computed with `makeSpiral()`. All elements sit at the corners of their parent section. Hidden on mobile.

### Modal

Generic modal using `createPortal` (renders into `document.body`). Closes on overlay click or ESC key. Animated with Framer Motion spring.

```jsx
<Modal open={open} onClose={() => setOpen(false)} title="Title">
  {children}
</Modal>
```

### SocialButton

Horizontal link button with Framer Motion color animation on hover/tap. The `color` prop sets the `backgroundColor` on hover via inline style (avoids Tailwind dynamic class limitations).

```jsx
<SocialButton icon={Github} label="GitHub" href="..." color="#333333" />
```

### IconBox

Square card for the Tools section. Spring animation on hover (desktop) and tap (mobile). `select-none` and `cursor-default` prevent selection.

### useMobile

Detects screen size using `matchMedia`. Avoids polling — responds to resize events.

```js
const isMobile = useMobile(768)  // true if viewport < 768px
```

---

## Navigation

`Navbar` is sticky (`position: sticky, top: 0`). All nav links use a scroll function that offsets by the navbar height so sections don't hide behind it:

```js
const navHeight = document.querySelector('header')?.offsetHeight ?? 80
window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' })
```

`useScrollSpy` tracks which section is active as the user scrolls.

---

## Animations

All entrance animations use `useIntersectionReveal`, a hook that returns a `ref` and inline `style` to fade+slide elements in when they enter the viewport.

Framer Motion is used for:
- Hero text stagger (container + item variants)
- Photo entrance (one-time, no loop)
- IconBox bubble effect (whileHover + whileTap)
- SocialButton color transition (whileHover + whileTap)
- Submit button lift (whileHover + whileTap)
- Modal entrance (spring, opacity + y)
- Contact modal step transitions (AnimatePresence, slide left/right)
- Shape decorations (continuous loop: rotate, float, oscillate, spin)

---

## Environment Variables

All Firebase credentials are stored in `.env` and read at build time by Vite. The `.env` file is excluded from git via `.gitignore`. A `.env.example` with empty values is committed as a setup reference.

For the seed script (Node), credentials are loaded with Node's native `--env-file=.env` flag (requires Node 20.6+).

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Note: The Firebase client `apiKey` is not a secret in the traditional sense — it is visible in the browser by design. The real security layer is Firestore security rules. Moving it to `.env` prevents it from appearing in git history.

---

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run seed     # populate Firestore with initial data (run once)

firebase deploy --only firestore:rules   # deploy security rules
```
