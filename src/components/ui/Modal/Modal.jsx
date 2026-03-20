import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed z-[101] top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-lg card-brutal bg-white p-6"
            initial={{ opacity: 0, x: '-50%', y: '-40%' }}
            animate={{ opacity: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, x: '-50%', y: '-40%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-lg uppercase tracking-tight">{title}</h3>
              <button
                onClick={onClose}
                className="border-[3px] border-black p-1 hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
