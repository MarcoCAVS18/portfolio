import { cn } from '../../../utils/cn'

export default function Container({ children, className }) {
  return (
    <div className={cn('max-w-6xl mx-auto px-6', className)}>
      {children}
    </div>
  )
}
