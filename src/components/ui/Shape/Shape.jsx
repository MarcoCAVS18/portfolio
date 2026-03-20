import { motion } from 'framer-motion'
import { cn } from '../../../utils/cn'

const animations = {
  rotate: {
    animate: { rotate: [0, 15, 0, -15, 0] },
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
  float: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
  oscillate: {
    animate: { y: [0, 8, 0], rotate: [0, -30, 0] },
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
  spin: {
    animate: { rotate: [0, 45, 0] },
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  none: {
    animate: {},
    transition: {},
  },
}

const colors = {
  yellow:  'bg-yellow-400 border-black',
  black:   'bg-black',
  white:   'bg-white border-black',
  outline: 'bg-transparent border-black',
}

export default function Shape({
  variant = 'filled',
  color = 'black',
  size = 24,
  animation = 'float',
  delay = 0,
  className,
}) {
  const { animate, transition } = animations[animation] ?? animations.none
  const colorClass = colors[color] ?? colors.black
  const needsBorder = color === 'outline' || color === 'white' || color === 'yellow'

  return (
    <motion.div
      className={cn(
        'pointer-events-none hidden md:block absolute',
        needsBorder && 'border-[3px]',
        colorClass,
        className,
      )}
      style={{ width: size, height: size }}
      animate={animate}
      transition={{ ...transition, delay }}
    />
  )
}
