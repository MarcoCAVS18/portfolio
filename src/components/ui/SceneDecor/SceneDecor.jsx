/**
 * SceneDecor — subtle SVG corner decorations.
 * Renders as a single absolute inset-0 layer so it never affects grid/flex layout.
 *
 * Usage:
 *   <SceneDecor variants={['spiral-tl', 'lines-br']} />
 */

function makeSpiral(cx, cy, turns = 2.5, maxR = 46) {
  const steps = turns * 72
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI
    const r = (i / steps) * maxR
    const x = cx + r * Math.cos(t - Math.PI / 2)
    const y = cy + r * Math.sin(t - Math.PI / 2)
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

const SPIRAL = makeSpiral(60, 60)

const decors = {
  'spiral-tl': (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      className="absolute top-0 left-0 opacity-[0.07]">
      <path d={SPIRAL} stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'spiral-tr': (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      className="absolute top-0 right-0 opacity-[0.07]">
      <path d={SPIRAL} stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'spiral-bl': (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      className="absolute bottom-0 left-0 opacity-[0.07]">
      <path d={SPIRAL} stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'spiral-br': (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      className="absolute bottom-0 right-0 opacity-[0.07]">
      <path d={SPIRAL} stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'lines-tl': (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none"
      className="absolute top-0 left-0 opacity-[0.08]">
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={i * 18 + 6} x2={90} y2={i * 18 + 6}
          stroke="black" strokeWidth="1.5" strokeDasharray="4 7" />
      ))}
    </svg>
  ),
  'lines-tr': (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none"
      className="absolute top-0 right-0 opacity-[0.08]">
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={i * 18 + 6} x2={90} y2={i * 18 + 6}
          stroke="black" strokeWidth="1.5" strokeDasharray="4 7" />
      ))}
    </svg>
  ),
  'lines-bl': (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none"
      className="absolute bottom-0 left-0 opacity-[0.08]">
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={i * 18 + 6} x2={90} y2={i * 18 + 6}
          stroke="black" strokeWidth="1.5" strokeDasharray="4 7" />
      ))}
    </svg>
  ),
  'lines-br': (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none"
      className="absolute bottom-0 right-0 opacity-[0.08]">
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={i * 18 + 6} x2={90} y2={i * 18 + 6}
          stroke="black" strokeWidth="1.5" strokeDasharray="4 7" />
      ))}
    </svg>
  ),
  'dots-tl': (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      className="absolute top-0 left-0 opacity-[0.08]">
      {[0,1,2,3].flatMap(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="black" />
      )))}
    </svg>
  ),
  'dots-tr': (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      className="absolute top-0 right-0 opacity-[0.08]">
      {[0,1,2,3].flatMap(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="black" />
      )))}
    </svg>
  ),
  'dots-bl': (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      className="absolute bottom-0 left-0 opacity-[0.08]">
      {[0,1,2,3].flatMap(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="black" />
      )))}
    </svg>
  ),
  'dots-br': (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
      className="absolute bottom-0 right-0 opacity-[0.08]">
      {[0,1,2,3].flatMap(row => [0,1,2,3].map(col => (
        <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="black" />
      )))}
    </svg>
  ),
}

export default function SceneDecor({ variants = [] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
      {variants.map(v => decors[v] ?? null)}
    </div>
  )
}
