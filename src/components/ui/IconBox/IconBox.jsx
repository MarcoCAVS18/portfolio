import { motion } from 'framer-motion'

export default function IconBox({ icon: Icon, label }) {
  return (
    <motion.div
      className="card-brutal bg-white flex flex-col items-center justify-center gap-2 p-4 w-24 h-24 select-none cursor-default"
      whileHover={{ y: -10, boxShadow: '6px 14px 0px black' }}
      whileTap={{ y: -10, boxShadow: '6px 14px 0px black' }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {Icon && <Icon size={28} strokeWidth={2} />}
      <span className="text-xs font-bold text-center leading-tight">{label}</span>
    </motion.div>
  )
}
