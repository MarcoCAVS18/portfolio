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
    id: 'gestor-turnos',
    title: 'Gestor de Turnos',
    description:
      'Shift management web app to track work hours, calculate weekly earnings, and stay on top of your schedule.',
    stack: ['React', 'Firebase', 'Tailwind'],
    demoUrl: 'https://orary.app',
    githubUrl: 'https://github.com/MarcoCAVS18/gestor-turnos',
    preview: null,
    logo: null,
    featured: false,
    order: 1,
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description:
      'Modular one-page portfolio built with React, Vite, and TailwindCSS using a neubrutalism design system.',
    stack: ['React', 'Vite', 'Tailwind'],
    demoUrl: 'https://orary.app',
    githubUrl: 'https://github.com/MarcoCAVS18/gestor-turnos',
    preview: null,
    logo: null,
    featured: false,
    order: 2,
  },
  {
    id: 'firebase-hooks',
    title: 'Firebase Hooks',
    description:
      'Lightweight React hook library for Firestore — real-time data, auth state, and storage uploads.',
    stack: ['React', 'Firebase'],
    demoUrl: 'https://orary.app',
    githubUrl: 'https://github.com/MarcoCAVS18/gestor-turnos',
    preview: null,
    logo: null,
    featured: false,
    order: 3,
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

  console.log('Done.')
}

seed().catch(err => { console.error(err); process.exit(1) })
