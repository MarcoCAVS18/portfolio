import { useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Badge from '../../ui/Badge/Badge'
import StackList from '../../ui/StackList/StackList'
import Button from '../../ui/Button/Button'
import BrutalistLoader from '../../ui/BrutalistLoader/BrutalistLoader'
import { trackEvent } from '../../../services/firebase/analytics'

function PhoneReveal() {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['15%', '-10%'])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0] z-10">
          <BrutalistLoader />
        </div>
      )}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.08}
        dragMomentum={false}
        style={{ y, width: '150%', marginLeft: '-25%', opacity: loaded ? 1 : 0 }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <img
          src="/images/3966813.ai.png"
          alt="App preview"
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', display: 'block' }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}

export default function FeaturedProjectCard({ title, description, stack = [], demoUrl, githubUrl, logo }) {
  function open(event, url) {
    trackEvent(event, { project_title: title })
    window.open(url, '_blank')
  }

  return (
    <div className="w-full border-[3px] border-black shadow-[8px_8px_0px_black] mb-8 grid grid-cols-1 lg:grid-cols-2">

      {/* Lado izquierdo — bloque de contenido */}
      <div className="bg-black p-8 lg:p-12 flex flex-col justify-between gap-8">

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge icon={<Star size={11} />}>Featured</Badge>
          </div>

          <div className="flex items-center gap-4">
            {logo && (
              <img
                src={logo}
                alt={`${title} logo`}
                className="h-12 w-12 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            )}
            <h3 className="text-4xl lg:text-5xl font-black text-white leading-none">{title}</h3>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">{description}</p>

          <StackList stack={stack} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {demoUrl && (
            <Button variant="primary" onClick={() => open('project_demo_click', demoUrl)}>
              View Demo
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" onClick={() => open('project_github_click', githubUrl)}>
              View Code
            </Button>
          )}
        </div>

      </div>

      {/* Lado derecho — imagen de phones */}
      <div className="bg-[#F5F5F0] border-l-[3px] border-black min-h-[360px] lg:min-h-0">
        <PhoneReveal />
      </div>

    </div>
  )
}
