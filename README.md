![Marco Piermatei](public/images/logo/logo.png)

# Marco Piermatei — Portfolio

Personal portfolio built with React, Vite, and TailwindCSS v4. Neubrutalism design system, data managed through Firebase Firestore, animated with Framer Motion.

**Live:** [marcop.netlify.app](https://marcop.netlify.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Styling | TailwindCSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion |
| Backend | Firebase Firestore + Analytics |
| Routing | React Router v7 |
| Email | Resend (via contact form) |
| Icons | Lucide React |
| Utilities | clsx, react-intersection-observer |
| Deploy | Netlify |

---

## Project Structure

```
src/
├── components/
│   ├── cards/          # ProjectCard, FeaturedProjectCard, TimelineCard, ToolCard
│   ├── layout/         # Container, Grid, Navbar, Section
│   ├── sections/       # Hero, Projects, Tools, Timeline, Contact
│   └── ui/             # Button, Badge, Chip, IconBox, SectionTitle, Divider, StackList, Shape, SceneDecor
├── data/               # Static fallback constants (tools.js, timeline.js)
├── hooks/              # useScrollSpy, useIntersectionReveal, useProjects
├── pages/              # Home.jsx, Admin.jsx
├── services/
│   └── firebase/       # firebaseConfig.js, projectsService.js, analytics.js
└── utils/              # cn.js (clsx wrapper), formatYear.js

public/
├── images/
│   ├── logo/           # logo.ico, logo.png, isologo.png
│   ├── frame-iphone/   # phone_035.png (iPhone mockup frame)
│   └── SVG/            # logo.svg, claude-color.svg
├── videos/             # sample_0.mp4 (Orary background video)
└── manifest.webmanifest

scripts/
└── seed.js             # Populates Firestore with tools, projects, and timeline data
```

---

## Data & Firestore

All dynamic content is stored in Firestore and fetched at runtime. The `scripts/seed.js` script populates the database.

### Collections

**`projects`** — Portfolio projects displayed in the Projects section.

| Field | Type | Description |
|---|---|---|
| `title` | string | Project name |
| `description` | string | Short description |
| `stack` | string[] | Technologies used |
| `demoUrl` | string | Live demo URL |
| `githubUrl` | string | GitHub repository URL |
| `featured` | boolean | Shows as FeaturedProjectCard if true |
| `builtWithClaude` | boolean | Shows "Built with Claude" badge |
| `order` | number | Display order |

**`tools`** — Tools and technologies shown in the Tools section.

| Field | Type | Description |
|---|---|---|
| `label` | string | Display name |
| `icon` | string | Lucide icon name |
| `order` | number | Display order |

**`timeline`** — Career timeline entries.

| Field | Type | Description |
|---|---|---|
| `year` | string | Year label |
| `location` | string | City, Country |
| `title` | string | Entry title |
| `description` | string | Narrative text |
| `skills` | string[] | Stack/technologies |
| `projects` | object[] | `{ name, url?, private? }` |

### Seeding

```bash
npm run seed
```

Requires a `.env` file with Firebase credentials. After seeding, set `allow write: if false` in `firestore.rules` and redeploy rules:

```bash
firebase deploy --only firestore:rules
```

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

### Environment variables

Create a `.env` file at the project root:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_ADMIN_API_URL=
```

---

## SEO & Meta

- **Favicon:** `logo.ico`
- **Apple touch icon:** `logo.png`
- **Open Graph / WhatsApp preview:** `isologo.png`
- **Web App Manifest:** `public/manifest.webmanifest`
- Dynamic `document.title` per page via `useEffect`
