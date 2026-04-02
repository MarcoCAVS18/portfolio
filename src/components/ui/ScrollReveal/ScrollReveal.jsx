import { motion } from 'framer-motion'

const variants = {
  up:    { hidden: { opacity: 0, y: 36 },  visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -36 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
}

/**
 * Reusable scroll-triggered reveal wrapper.
 *
 * Props:
 *  direction — 'up' | 'down' | 'left' | 'right'  (default: 'up')
 *  delay     — seconds (default: 0)
 *  duration  — seconds (default: 0.5)
 *  className — forwarded to the wrapper div
 *  margin    — IntersectionObserver rootMargin (default: '-60px')
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className,
  margin = '-60px',
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={variants[direction]}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
