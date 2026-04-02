export default function Chip({ children }) {
  return (
    <span className="inline-block border border-black px-2 py-0.5 text-xs font-mono font-medium bg-yellow-100">
      {children}
    </span>
  )
}
