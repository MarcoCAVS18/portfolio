import { useRef } from 'react'
import { Atom, Code2, Server, Flame, GitBranch, Box, Terminal, Pen, Smartphone, Shield, Brush, Send, Zap, Wind, Route, Languages, QrCode, AppWindow, Rocket } from 'lucide-react'
import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import IconBox from '../../ui/IconBox/IconBox'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import useTools from '../../../hooks/useTools'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

const iconMap = { Atom, Code2, Server, Flame, GitBranch, Box, Terminal, Pen, Smartphone, Shield, Brush, Send, Zap, Wind, Route, Languages, QrCode, AppWindow, Rocket }

export default function Tools() {
  const { ref, style } = useIntersectionReveal()
  const { tools, loading } = useTools()
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = e => {
    drag.current = { active: true, startX: e.pageX, scrollLeft: scrollRef.current.scrollLeft }
    scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = e => {
    if (!drag.current.active) return
    e.preventDefault()
    scrollRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX)
  }
  const onMouseUp = () => {
    drag.current.active = false
    scrollRef.current.style.cursor = 'grab'
  }

  return (
    <div ref={ref} style={style} className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SceneDecor variants={['spiral-br', 'cross-tr']} />
        <Shape color="outline" size={24} animation="rotate" delay={0}  className="top-4 left-8" />
        <Shape color="yellow"  size={18} animation="float"  delay={2}  className="bottom-4 right-12" />
      </div>

      <SectionTitle title="Tools" subtitle="The tech I use to design, build, and deploy." />
      <div
        ref={scrollRef}
        className="-mx-6 overflow-x-auto scrollbar-hide cursor-grab select-none [&_*]:cursor-[inherit]"
        onWheel={e => { e.preventDefault(); scrollRef.current.scrollLeft += e.deltaY }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="flex gap-6 py-4 px-6 w-max">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card-brutal bg-white w-24 h-24 animate-pulse shrink-0" />
              ))
            : tools.map(({ id, label, icon }) => {
                const Icon = iconMap[icon] ?? Code2
                return <IconBox key={id} icon={Icon} label={label} />
              })
          }
        </div>
      </div>
    </div>
  )
}
