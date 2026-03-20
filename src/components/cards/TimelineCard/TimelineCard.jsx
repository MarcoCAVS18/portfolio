export default function TimelineCard({ year, title, description }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full border-2 border-black bg-yellow-300 mt-1 shrink-0 shadow-[2px_2px_0px_black]" />
        <div className="w-0.5 bg-black flex-1 mt-2 last:hidden" />
      </div>
      <div className="pb-10">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-500">{year}</span>
        <h3 className="text-lg font-black mt-0.5">{title}</h3>
        <p className="text-sm text-neutral-600 mt-1">{description}</p>
      </div>
    </div>
  )
}
