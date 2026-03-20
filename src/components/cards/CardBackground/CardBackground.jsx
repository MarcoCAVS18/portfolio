import { cn } from '../../../utils/cn'

export default function CardBackground({ preview }) {
  // Wrapper propio con overflow-hidden + border-radius para recortar la imagen rotada
  // sin afectar el contenido de la card que vive fuera de este div
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px]">
      {preview && (
        <img
          src={preview}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 rotate-[-4deg] origin-center"
        />
      )}
      <div className={cn('absolute inset-0', preview ? 'bg-yellow-400/60' : 'bg-white')} />
    </div>
  )
}
