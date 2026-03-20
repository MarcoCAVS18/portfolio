export default function Badge({ children }) {
  return (
    <span className="inline-block border-2 border-black rounded-full px-3 py-0.5 text-xs font-bold bg-yellow-300 shadow-[2px_2px_0px_black]">
      {children}
    </span>
  )
}
