import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey:            process.env.VITE_FIREBASE_API_KEY,
  authDomain:        process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.VITE_FIREBASE_APP_ID,
  measurementId:     process.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ─── Tools ────────────────────────────────────────────────────────────────────
const tools = [
  { id: 'react',      label: 'React',      icon: 'Atom',       order: 1 },
  { id: 'javascript', label: 'JavaScript', icon: 'Code2',      order: 2 },
  { id: 'node',       label: 'Node.js',    icon: 'Server',     order: 3 },
  { id: 'firebase',   label: 'Firebase',   icon: 'Flame',      order: 4 },
  { id: 'git',        label: 'Git',        icon: 'GitBranch',  order: 5 },
  { id: 'docker',     label: 'Docker',     icon: 'Box',        order: 6 },
  { id: 'capacitor',  label: 'Capacitor',  icon: 'Smartphone', order: 7 },
  { id: 'cloudflare', label: 'Cloudflare', icon: 'Shield',     order: 8 },
  { id: 'adobe',      label: 'Adobe',      icon: 'Brush',      order: 9 },
  { id: 'resend',     label: 'Resend',     icon: 'Send',       order: 10 },
]

// ─── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'orary',
    title: 'Orary',
    description:
      'Know what you earn before you earn it. Orary calculates your income in real time — for traditional jobs and delivery alike. It helps you understand which hours are actually worth your time, optimise your weekly schedule, and use it as a daily work calendar to get smarter every shift. Includes WHV mode to calculate the exact days needed to extend your Working Holiday Visa in Australia.',
    stack: ['React', 'Firebase', 'Capacitor', 'Expo', 'Resend', 'Tailwind', 'Stripe'],
    demoUrl: 'https://orary.app',
    githubUrl: 'https://github.com/MarcoCAVS18/gestor-turnos',
    preview: '/images/captura-orary.png',
    logo: '/images/SVG/logo.svg',
    featured: true,
    order: 0,
  },
  {
    id: 'caaf-memory',
    title: 'CAAF Memory',
    description:
      'Developed rapidly to meet company requirements — secure and production-ready from day one.',
    stack: ['React', 'Firebase', 'Tailwind'],
    demoUrl: 'https://caaf.netlify.app/',
    githubUrl: 'https://github.com/MarcoCAVS18/caaf-memory',
    preview: null,
    logo: null,
    featured: false,
    builtWithClaude: true,
    order: 1,
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description:
      'Modular one-page portfolio built with React, Vite, and TailwindCSS using a neubrutalism design system.',
    stack: ['React', 'Vite', 'Tailwind'],
    demoUrl: 'https://marcop.netlify.app/',
    githubUrl: 'https://github.com/MarcoCAVS18/marco-portfolio',
    preview: null,
    logo: null,
    featured: false,
    order: 2,
  },
  {
    id: 'pepperoni',
    title: 'Pepperoni',
    description:
      'Pizza store app built to learn proper e-commerce development — user authentication and full store functionality.',
    stack: ['React', 'Firebase', 'Tailwind'],
    demoUrl: 'https://pizzita.netlify.app/',
    githubUrl: 'https://github.com/MarcoCAVS18/pizzahost',
    preview: null,
    logo: null,
    featured: false,
    order: 3,
  },
]

// ─── Timeline ─────────────────────────────────────────────────────────────────
const timeline = [
  {
    id: '2020',
    year: '2020',
    location: 'Rosario, Argentina',
    title: 'First Steps',
    description:
      'Wrote my first lines of Java and Python, getting a feel for OOP and logic. On the creative side, I experimented with SparkAR — building Facebook filters with flat and 3D objects.',
    skills: ['Java', 'Python', 'OOP', 'SparkAR'],
    projects: [{ name: 'SparkAR Filters' }],
  },
  {
    id: '2022',
    year: '2022',
    location: 'Italy',
    title: 'Code Across Borders',
    description:
      'Traveled to Italy to claim citizenship. Between that and working night shifts at a hotel, I kept coding — mentoring friends on Python frameworks as the world slowly reopened.',
    skills: ['Python', 'Tkinter', 'FastAPI', 'Django'],
    projects: [],
  },
  {
    id: '2023',
    year: '2023',
    location: 'Barcelona, Spain',
    title: 'React Changed Everything',
    description:
      'Moved to Barcelona, working in Customer Service by day and diving deep into React by night. Completed a Coderhouse course and shipped internal tools that made my whole team more efficient.',
    skills: ['React', 'JavaScript', 'Vite', 'Firebase'],
    projects: [
      { name: 'Empanamia', url: 'https://github.com/MarcoCAVS18/Empanamia' },
      { name: 'Internal Tools' },
    ],
  },
  {
    id: '2024',
    year: '2024',
    location: 'Australia',
    title: 'Building on the Move',
    description:
      'Worked hands-on roles — housekeeping, cellar hand, grain handler — while leveling up my UI skills. Launched Pepperoni: a responsive platform for gastronomy businesses, focused on pizzerias.',
    skills: ['Tailwind CSS', 'Material UI', 'React'],
    projects: [
      { name: 'Pepperoni', url: 'https://github.com/MarcoCAVS18/pizzahost' },
    ],
  },
  {
    id: '2025',
    year: '2025',
    location: 'Remote',
    title: 'Full Throttle',
    description:
      'A year of serious growth. Integrated AI tools into my workflow, wrote automation scripts, explored TypeScript, and tackled more complex architectures.',
    skills: ['TypeScript', 'LLMs', 'Scripts', 'Codeviz'],
    projects: [
      { name: 'Orary', url: 'https://github.com/MarcoCAVS18/gestor-turnos' },
      { name: 'Side projects' },
      { name: 'Contact-cards', url: 'https://github.com/MarcoCAVS18/contact-cards' },
    ],
  },
  {
    id: '2026',
    year: '2026',
    location: 'New Zealand',
    title: 'Putting It All Together',
    description:
      "Orary is live. Built with Firebase, Firestore, OAuth, Google Cloud, and custom domain deployment — it pushed me into real infrastructure territory. New APIs, new lessons, and a clearer sense of where I'm heading.",
    skills: ['Firebase', 'OAuth', 'Google Cloud', 'Firestore', 'DNS'],
    projects: [
      { name: 'Orary', url: 'https://github.com/MarcoCAVS18/gestor-turnos' },
      { name: 'Works', url: 'https://github.com/MarcoCAVS18/beluymarco', private: true },
      { name: 'CAAF Memory', url: 'https://github.com/MarcoCAVS18/caaf-memory' },
    ],
  },
]

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function writeWithRetry(ref, data, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await setDoc(ref, data)
      return
    } catch (err) {
      if (err.code === 'permission-denied' && i < retries - 1) {
        const wait = (i + 1) * 2000
        console.log(`  ⏳ permission-denied, retrying in ${wait / 1000}s...`)
        await new Promise(r => setTimeout(r, wait))
      } else {
        throw err
      }
    }
  }
}

async function seed() {
  console.log('Seeding tools...')
  for (const { id, ...data } of tools) {
    await writeWithRetry(doc(db, 'tools', id), data)
    console.log(`  ✓ tools/${id}`)
  }

  console.log('Seeding projects...')
  for (const { id, ...data } of projects) {
    await writeWithRetry(doc(db, 'projects', id), data)
    console.log(`  ✓ projects/${id}`)
  }

  console.log('Seeding timeline...')
  for (const { id, ...data } of timeline) {
    await writeWithRetry(doc(db, 'timeline', id), data)
    console.log(`  ✓ timeline/${id}`)
  }

  console.log('Done.')
}

seed().catch(err => { console.error(err); process.exit(1) })
