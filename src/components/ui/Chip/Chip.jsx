export default function Chip({ children }) {
  return (
    <span className="inline-block border-2 border-black rounded-lg px-3 py-1 text-xs font-semibold bg-neutral-100 shadow-[2px_2px_0px_black]">
      {children}
    </span>
  )
}
