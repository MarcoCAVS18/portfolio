import { motion } from 'framer-motion'

export default function SocialButton({ icon: Icon, label, href, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 border-[3px] border-black bg-white font-black text-sm uppercase tracking-wide select-none cursor-pointer w-full"
      style={{ boxShadow: '4px 4px 0px black' }}
      whileHover={{ y: -4, backgroundColor: color, boxShadow: '6px 10px 0px black' }}
      whileTap={{ y: 0, boxShadow: '2px 2px 0px black' }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {label}
    </motion.a>
  )
}
