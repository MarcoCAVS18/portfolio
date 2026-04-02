import { motion } from 'framer-motion'
import { cn } from '../../../utils/cn'

const variants = {
  yellow: 'bg-yellow-300 text-black border-black shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black]',
  orange: 'bg-[#D97757] text-white border-black shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black]',
  black:  'bg-black text-white border-black shadow-[2px_2px_0px_#555] hover:shadow-[4px_4px_0px_#555]',
  white:  'bg-white text-black border-black shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black]',
}

export default function Badge({ children, icon, variant = 'yellow', className }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'inline-flex items-center gap-1.5 border-2 rounded-full px-3 py-0.5 text-xs font-bold transition-shadow duration-150 cursor-default select-none',
        variants[variant],
        className,
      )}
    >
      {icon && (
        typeof icon === 'string'
          ? <img src={icon} alt="" aria-hidden="true" className="h-3.5 w-3.5 object-contain" />
          : <span className="flex items-center">{icon}</span>
      )}
      {children}
    </motion.span>
  )
}
