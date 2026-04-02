import { useState, useEffect, useRef } from 'react'
import BrutalistLoader from '../BrutalistLoader/BrutalistLoader'
import { cn } from '../../../utils/cn'

const SLIDE_DURATION = 6000   // ms each image is shown
const LOADER_HOLD    = 350    // ms loader is visible before switching src

export default function BrutalistFrame({ src, images, alt = '', className }) {
  const srcs = images ?? (src ? [src] : [])
  const [index, setIndex] = useState(0)
  const [activeSrc, setActiveSrc] = useState(srcs[0] ?? '')
  const [loaded, setLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef(null)

  // Auto-cycle when multiple images provided
  useEffect(() => {
    if (srcs.length <= 1) return

    timerRef.current = setTimeout(() => {
      setTransitioning(true)
      setLoaded(false)

      setTimeout(() => {
        const next = (index + 1) % srcs.length
        setIndex(next)
        setActiveSrc(srcs[next])
        setTransitioning(false)
      }, LOADER_HOLD)
    }, SLIDE_DURATION)

    return () => clearTimeout(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, loaded])

  const showLoader = !loaded || transitioning

  return (
    <div className={cn('relative', className)}>

      {/* Líneas paralelas decorativas — lado izquierdo */}
      <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-center gap-2.5 pointer-events-none">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="w-4 h-[2px] bg-black" />
        ))}
      </div>

      {/* Triángulo amarillo — esquina superior derecha */}
      <div
        className="absolute top-0 right-0 z-10 pointer-events-none"
        style={{
          width: 0,
          height: 0,
          borderTop: '36px solid #facc15',
          borderLeft: '36px solid transparent',
        }}
      />
      {/* Borde del triángulo — capa negra ligeramente más grande detrás */}
      <div
        className="absolute top-0 right-0 z-9 pointer-events-none"
        style={{
          width: 0,
          height: 0,
          borderTop: '40px solid black',
          borderLeft: '40px solid transparent',
        }}
      />

      {/* Marco — cuadrado, bordes duros, sombra offset */}
      <div className="border-[3px] border-black shadow-[6px_6px_0px_black] overflow-hidden aspect-square">

        {/* Loader */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-200',
          showLoader ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}>
          <BrutalistLoader />
        </div>

        <img
          key={activeSrc}
          src={activeSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn(
            'w-full h-full object-cover object-top transition-opacity duration-500',
            loaded && !transitioning ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

    </div>
  )
}
