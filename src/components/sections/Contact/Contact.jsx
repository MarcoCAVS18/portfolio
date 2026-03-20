import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Instagram, Linkedin, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import SocialButton from '../../ui/SocialButton/SocialButton'
import Modal from '../../ui/Modal/Modal'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import { submitContact } from '../../../services/firebase/contactService'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

const inputClass =
  'border-[3px] border-black px-4 py-3 font-bold text-sm bg-white focus:outline-none focus:shadow-[4px_4px_0px_black] transition-shadow w-full'

const socials = [
  { id: 'whatsapp',  label: 'WhatsApp',  icon: MessageCircle, href: 'https://wa.me/your-number',           color: '#25D366' },
  { id: 'instagram', label: 'Instagram', icon: Instagram,     href: 'https://instagram.com/your-handle',   color: '#E1306C' },
  { id: 'linkedin',  label: 'LinkedIn',  icon: Linkedin,      href: 'https://linkedin.com/in/your-handle', color: '#0A66C2' },
  { id: 'github',    label: 'GitHub',    icon: Github,        href: 'https://github.com/MarcoCAVS18',      color: '#333333' },
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
            <span className="font-bold">"John Doe"</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">email</span>
            <span className="font-bold">"john@example.com"</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-400 w-20 shrink-0">message</span>
            <span className="font-bold">"Hey, I'd love to work with you..."</span>
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
    label: 'Custom Platform',
    content: (
      <div className="flex flex-col gap-4 text-sm">
        <p className="font-bold text-neutral-600">
          I also built a private dashboard that pulls messages from Firebase and
          displays them in a clean, readable format — so I never miss anything.
        </p>
        <div className="border-[3px] border-black bg-neutral-100 h-48 flex items-center justify-center">
          <span className="font-black text-neutral-400 uppercase text-xs tracking-widest">
            Dashboard screenshot coming soon
          </span>
        </div>
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

            <div className="flex items-center justify-between">
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ y: -3, boxShadow: '6px 9px 0px black' }}
                whileTap={{ y: 0, boxShadow: '3px 3px 0px black' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="btn-brutal bg-yellow-400 px-8 py-3 font-black uppercase text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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

        {/* Social buttons */}
        <div className="flex flex-row flex-wrap lg:flex-col gap-3 lg:w-52">
          {socials.map(({ id, ...props }) => (
            <SocialButton key={id} {...props} />
          ))}
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
