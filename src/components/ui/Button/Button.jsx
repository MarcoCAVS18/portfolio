import { cn } from '../../../utils/cn'

const variants = {
  primary: 'bg-black text-white hover:bg-neutral-800',
  outline: 'bg-white text-black hover:bg-neutral-100',
}

export default function Button({ variant = 'primary', children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'btn-brutal px-5 py-2.5 font-bold text-sm cursor-pointer',
        'transition-all duration-150 ease-in-out',
        'hover:-translate-y-1 hover:shadow-[5px_5px_0px_black]',
        'active:translate-y-0 active:translate-x-0 active:shadow-[1px_1px_0px_black]',
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  )
}
