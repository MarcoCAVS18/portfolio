import { Atom, Code2, Server, Flame, GitBranch, Box, Terminal, Pen, Smartphone, Shield, Brush, Send } from 'lucide-react'
import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import IconBox from '../../ui/IconBox/IconBox'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import useTools from '../../../hooks/useTools'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

const iconMap = { Atom, Code2, Server, Flame, GitBranch, Box, Terminal, Pen, Smartphone, Shield, Brush, Send }

export default function Tools() {
  const { ref, style } = useIntersectionReveal()
  const { tools, loading } = useTools()

  return (
    <div ref={ref} style={style} className="relative overflow-hidden">
      <SceneDecor variants={['spiral-br', 'cross-tr']} />
      <Shape color="outline" size={24} animation="rotate"    delay={0}   className="top-4 left-8" />
      <Shape color="yellow"  size={18} animation="float"     delay={2}   className="bottom-4 right-12" />

      <SectionTitle title="Tools" subtitle="The tech I use to design, build, and deploy." />
      <div className="flex flex-wrap gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-brutal bg-white w-24 h-24 animate-pulse" />
            ))
          : tools.map(({ id, label, icon }) => {
              const Icon = iconMap[icon] ?? Code2
              return <IconBox key={id} icon={Icon} label={label} />
            })
        }
      </div>
    </div>
  )
}
