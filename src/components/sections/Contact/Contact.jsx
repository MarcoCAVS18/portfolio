import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Instagram, Linkedin, Github, ChevronLeft, ChevronRight, FileDown, User, Mail, Clock, Trash2, RefreshCw, LogOut } from 'lucide-react'
import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import SocialButton from '../../ui/SocialButton/SocialButton'
import Button from '../../ui/Button/Button'
import Modal from '../../ui/Modal/Modal'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import { submitContact } from '../../../services/firebase/contactService'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

const inputClass =
  'border-[3px] border-black px-4 py-3 font-bold text-sm bg-white focus:outline-none focus:shadow-[4px_4px_0px_black] transition-shadow w-full'

const socials = [
  { id: 'whatsapp',  label: 'WhatsApp',  icon: MessageCircle, href: 'https://api.whatsapp.com/send/?phone=5493417227916&text&type=phone_number&app_absent=0', color: '#25D366' },
  { id: 'instagram', label: 'Instagram', icon: Instagram,     href: 'https://www.instagram.com/marco.piermatei/',                                            color: '#E1306C' },
  { id: 'linkedin',  label: 'LinkedIn',  icon: Linkedin,      href: 'https://www.linkedin.com/in/marco-piermatei/',                                          color: '#0A66C2' },
  { id: 'github',    label: 'GitHub',    icon: Github,        href: 'https://github.com/MarcoCAVS18',                                                         color: '#333333' },
]

const steps = [
  {
    label: 'Firebase Console',
    content: (
      <div className="flex flex-col gap-4 text-sm">
        <p className="font-bold text-neutral-600">
          Every message lands instantly in my Firebase database. This is the raw
          document I receive in the Firestore console:
        </p>
        <div className="border-[3px] border-black bg-neutral-50 p-4 font-mono text-xs flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">name</span>
            <span className="font-bold">"Marco Piermatei"</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">email</span>
            <span className="font-bold">"marcopiermatei1@gmail.com"</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">message</span>
            <span className="font-bold">"Hey Marco, this is just a test! ..."</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">createdAt</span>
            <span className="font-bold text-yellow-600">March 19, 2026 — 10:42 AM</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Admin Dashboard',
    content: (
      <div className="flex flex-col gap-4 text-sm">
        <p className="font-bold text-neutral-600">
          I built a private dashboard on top of Firebase that lets me read and
          manage every message in one place.
        </p>
        {/* Miniature dashboard mockup */}
        <div className="border-[3px] border-black bg-neutral-100 overflow-hidden select-none">
          {/* Top bar */}
          <div className="bg-white border-b-[2px] border-black px-3 py-2 flex items-center justify-between">
            <div>
              <p className="font-black text-[10px] uppercase tracking-tight">Contacts</p>
              <p className="font-bold text-[8px] text-neutral-400">1 message</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="border-[1.5px] border-black px-1.5 py-0.5 flex items-center gap-1">
                <RefreshCw size={7} strokeWidth={3} />
                <span className="font-black text-[7px] uppercase">Refresh</span>
              </div>
              <div className="border-[1.5px] border-black px-1.5 py-0.5 flex items-center gap-1">
                <LogOut size={7} strokeWidth={3} />
                <span className="font-black text-[7px] uppercase">Logout</span>
              </div>
            </div>
          </div>
          {/* Contact card */}
          <div className="p-3">
            <div className="bg-white border-[2px] border-black shadow-[2px_2px_0px_black] p-3 flex flex-col gap-2 select-none">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <User size={9} strokeWidth={3} />
                    <span className="font-black text-[9px] uppercase">Marco Piermatei</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <Mail size={8} strokeWidth={2.5} />
                    <span className="font-bold text-[8px]">marcopiermatei1@gmail.com</span>
                  </div>
                </div>
                <div className="border-[1.5px] border-black bg-red-400 px-1.5 py-0.5 flex items-center gap-1 shrink-0">
                  <Trash2 size={7} strokeWidth={3} />
                  <span className="font-black text-[7px] uppercase">Delete</span>
                </div>
              </div>
              <p className="font-bold text-[8px] text-neutral-600 border-l-[2px] border-yellow-400 pl-2 leading-relaxed">
                "Hey Marco, this is just a test! ..."
              </p>
              <div className="flex items-center gap-1 text-neutral-400">
                <Clock size={7} strokeWidth={2.5} />
                <span className="font-bold text-[7px]">19 Mar 2026, 10:42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'How to Access',
    content: (
      <div className="flex flex-col gap-4 text-sm">
        <p className="font-bold text-neutral-600">
          The dashboard lives at <code className="bg-neutral-100 border-[2px] border-black px-1.5 py-0.5 font-mono text-xs">/admin</code> on
          this site. It's protected by a token gate — just a password field backed by a{' '}
          <span className="font-black">FastAPI</span> API that validates the bearer token before
          showing anything.
        </p>
        <div className="border-[3px] border-black bg-neutral-50 p-4 flex flex-col gap-2 font-mono text-xs">
          <div className="flex gap-2">
            <span className="text-neutral-400 shrink-0 select-none">URL</span>
            <span className="font-bold">marcoportfolio.com/admin</span>
          </div>
          <div className="flex gap-2 select-none">
            <span className="text-neutral-400 shrink-0">Auth</span>
            <span className="font-bold">Bearer token <span className="text-neutral-400">(private)</span></span>
          </div>
          <div className="flex gap-2 select-none">
            <span className="text-neutral-400 shrink-0">API</span>
            <span className="font-bold">FastAPI + Firebase Admin SDK</span>
          </div>
        </div>
        <p className="font-bold text-xs text-neutral-400 border-l-[3px] border-yellow-400 pl-3">
          For obvious reasons I can't share the token publicly — but you're welcome to ask if we're already in touch.
        </p>
      </div>
    ),
  },
]

function InboxSteps() {
  const [step, setStep] = useState(0)
  const total = steps.length

  return (
    <div className="flex flex-col gap-5">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wide cursor-pointer transition-colors duration-150 ${
              i === step ? 'text-black' : 'text-neutral-400'
            }`}
          >
            <span className={`w-5 h-5 flex items-center justify-center border-[2px] text-[10px] ${
              i === step ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-400'
            }`}>
              {i + 1}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="border-t-[2px] border-neutral-200" />

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.15 }}
        >
          {steps[step].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 font-black text-xs uppercase tracking-wide disabled:opacity-30 cursor-pointer disabled:cursor-default"
        >
          <ChevronLeft size={14} strokeWidth={3} /> Prev
        </button>
        <span className="font-bold text-xs text-neutral-400">{step + 1} / {total}</span>
        <button
          onClick={() => setStep(s => Math.min(total - 1, s + 1))}
          disabled={step === total - 1}
          className="flex items-center gap-1 font-black text-xs uppercase tracking-wide disabled:opacity-30 cursor-pointer disabled:cursor-default"
        >
          Next <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}

export default function Contact() {
  const { ref, style } = useIntersectionReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [modalOpen, setModalOpen] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={ref} style={style} className="relative overflow-hidden">
      <SceneDecor variants={['spiral-tr', 'dots-tl']} />
      <Shape color="yellow"  size={22} animation="rotate"    delay={0}   className="top-4 right-6" />
      <Shape color="outline" size={16} animation="oscillate" delay={1}   className="bottom-6 left-10" />

      <SectionTitle title="Contact" subtitle="Got a project in mind? Let's talk." />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

        {/* Form */}
        {status === 'success' ? (
          <div className="card-brutal bg-yellow-400 p-8 md:p-12 flex flex-col items-center gap-4 text-center flex-1">
            <span className="text-5xl font-black">✓</span>
            <p className="font-black text-2xl uppercase tracking-tight">Message sent!</p>
            <p className="font-bold text-sm">I'll get back to you as soon as possible.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 border-[3px] border-black bg-black text-white font-black uppercase text-sm px-6 py-2 hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="card-brutal bg-white p-6 lg:p-8 flex flex-col gap-6 flex-1"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-black uppercase text-xs tracking-widest">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="font-black uppercase text-xs tracking-widest">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-xs tracking-widest">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p className="font-bold text-sm border-[3px] border-black bg-red-100 px-4 py-2">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-2">
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ y: -3, boxShadow: '6px 9px 0px black' }}
                whileTap={{ y: 0, boxShadow: '3px 3px 0px black' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="btn-brutal bg-yellow-400 px-8 py-3 font-black uppercase text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full md:w-auto"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </motion.button>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-xs font-bold text-neutral-400 cursor-pointer"
              >
                How do I see your message?
              </button>
            </div>
          </form>
        )}

        {/* Social buttons + Resume */}
        <div className="flex flex-col justify-between gap-3 lg:w-52 lg:self-stretch">
          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3">
            {socials.map(({ id, ...props }) => (
              <SocialButton key={id} {...props} />
            ))}
          </div>

          <div className="border-t-[2px] border-neutral-200 pt-3">
            <Button
              as="a"
              href="#"
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <FileDown size={15} strokeWidth={2.5} />
              Resume PDF
            </Button>
          </div>
        </div>

      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="How do I see your message?"
      >
        <InboxSteps />
      </Modal>

    </div>
  )
}
