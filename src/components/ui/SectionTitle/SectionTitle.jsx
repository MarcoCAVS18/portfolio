export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-black tracking-tight leading-none">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-base text-neutral-600 font-medium">{subtitle}</p>
      )}
    </div>
  )
}
