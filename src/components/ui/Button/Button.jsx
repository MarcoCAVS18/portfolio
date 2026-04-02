import { cn } from '../../../utils/cn'

const variants = {
  primary:   'bg-black text-white hover:bg-neutral-800',
  outline:   'bg-white text-black hover:bg-neutral-100',
  secondary: 'bg-neutral-100 text-neutral-500 border-neutral-300 shadow-[3px_3px_0px_#d4d4d4] hover:bg-neutral-200 hover:text-neutral-700 hover:shadow-[5px_5px_0px_#d4d4d4]',
}

export default function Button({ as: Tag = 'button', variant = 'primary', children, onClick, className, ...props }) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'btn-brutal px-5 py-2.5 font-bold text-sm cursor-pointer',
        'transition-all duration-150 ease-in-out',
        'hover:-translate-y-1',
        variant !== 'secondary' && 'hover:shadow-[5px_5px_0px_black]',
        'active:translate-y-0 active:translate-x-0',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
