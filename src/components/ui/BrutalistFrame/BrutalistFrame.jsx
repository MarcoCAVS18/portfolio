import { useState } from 'react'
import BrutalistLoader from '../BrutalistLoader/BrutalistLoader'
import { cn } from '../../../utils/cn'

export default function BrutalistFrame({ src, alt = '', className }) {
  const [loaded, setLoaded] = useState(false)

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
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}>
          <BrutalistLoader />
        </div>

        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn(
            'w-full h-full object-cover object-top transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

    </div>
  )
}
