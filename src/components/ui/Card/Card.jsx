import { cn } from '../../../utils/cn'

export default function Card({ children, className }) {
  return (
    <div className={cn(
      'card-brutal bg-white p-5',
      'transition-all duration-150 ease-in-out',
      'hover:-translate-y-1 hover:shadow-[8px_8px_0px_black]',
      className,
    )}>
      {children}
    </div>
  )
}
