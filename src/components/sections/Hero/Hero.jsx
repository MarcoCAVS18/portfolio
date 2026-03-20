import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Laptop, ExternalLink } from 'lucide-react'
import BrutalistFrame from '../../ui/BrutalistFrame/BrutalistFrame'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import { status } from '../../../data/status'
import { getGreeting } from '../../../utils/greeting'

const ROLES = ['Developer', 'Designer', 'Cellar Hand', 'Housekeeper', 'Grain Handler', 'A bit of everything :)']
const TYPING_SPEED = 80
const DELETING_SPEED = 45
const PAUSE_AFTER_WORD = 1800
const PAUSE_BEFORE_DELETE = 300

function useTypewriter(words) {
  const [display, setDisplay] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[wordIndex]

    if (phase === 'typing') {
      if (display.length < word.length) {
        const t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), TYPING_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pausing'), PAUSE_BEFORE_DELETE)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_WORD)
      return () => clearTimeout(t)
    }
    if (phase === 'deleting') {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), DELETING_SPEED)
        return () => clearTimeout(t)
      } else {
        setWordIndex(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [display, phase, wordIndex, words])

  return display
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Hero() {
  const { text: greetingText, Icon: GreetingIcon } = getGreeting()
  const role = useTypewriter(ROLES)

  return (
    <div className="relative py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">

      {/* Subtle SVG background */}
      <SceneDecor variants={['spiral-tl', 'lines-tr', 'dots-br']} />

      {/* Animated squares */}
      <Shape color="yellow"   size={40} animation="rotate"    delay={0}   className="top-6 right-4" />
      <Shape color="black"    size={16} animation="spin"      delay={1}   className="bottom-10 left-[46%]" />
      <Shape color="outline"  size={16} animation="oscillate" delay={2}   className="top-1/2 right-[6%]" />

      {/* Photo — one-time entrance, no loop */}
      <motion.div
        className="flex justify-center order-1 md:order-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <BrutalistFrame
          src="/images/yop.png"
          alt="Marco"
          className="w-64 md:w-80"
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="order-2 md:order-1 flex flex-col"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={item} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 mb-3">
          <GreetingIcon size={15} strokeWidth={2} />
          {greetingText}
        </motion.p>

        <motion.h1 variants={item} className="text-6xl font-black tracking-tight leading-none mb-3">
          I&apos;M MARCO
        </motion.h1>

        <motion.div variants={item} className="flex items-center gap-2 mb-5 h-9">
          <span className="text-2xl font-black tracking-tight text-neutral-700">{role}</span>
          <span className="inline-block w-[3px] h-6 bg-black animate-pulse" />
        </motion.div>

        <motion.p variants={item} className="text-lg text-neutral-700 font-medium leading-relaxed mb-2">
          I've always been the one opening DevTools on every page I visit —
          inspecting, breaking things on purpose, and rebuilding just to
          understand how it all works.
        </motion.p>
        <motion.p variants={item} className="text-lg text-neutral-700 font-medium leading-relaxed mb-7">
          For years I've been doing this while traveling the world: shipping
          products, learning from every city I land in, and turning curiosity
          into craft. I'm proud of the road I've walked — and I'm not done yet.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <a
            href={status.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-[3px] border-black px-3 py-1.5 text-sm font-bold bg-white shadow-[3px_3px_0px_black] hover:-translate-y-0.5 hover:shadow-[3px_5px_0px_black] transition-all duration-150"
          >
            <MapPin size={14} strokeWidth={2.5} />
            {status.location}
            <ExternalLink size={11} strokeWidth={2.5} className="text-neutral-400" />
          </a>

          <a
            href={status.workingOnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-[3px] border-black px-3 py-1.5 text-sm font-bold bg-yellow-400 shadow-[3px_3px_0px_black] hover:-translate-y-0.5 hover:shadow-[3px_5px_0px_black] transition-all duration-150"
          >
            <Laptop size={14} strokeWidth={2.5} />
            Working on {status.workingOn}
          </a>
        </motion.div>
      </motion.div>

    </div>
  )
}
