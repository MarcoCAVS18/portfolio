import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import TimelineCard from '../../cards/TimelineCard/TimelineCard'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import { timeline } from '../../../data/timeline'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

export default function Timeline() {
  const { ref, style } = useIntersectionReveal()

  return (
    <div ref={ref} style={style} className="relative overflow-hidden">
      <SceneDecor variants={['lines-tr', 'dots-br']} />
      <Shape color="black"   size={18} animation="spin"      delay={0}   className="top-6 right-8" />
      <Shape color="outline" size={28} animation="float"     delay={1.5} className="bottom-8 left-6" />

      <SectionTitle title="Timeline" subtitle="My journey so far." />
      <div className="max-w-xl">
        {timeline.map((entry) => (
          <TimelineCard key={entry.id} {...entry} />
        ))}
      </div>
    </div>
  )
}
