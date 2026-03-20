import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import Grid from '../../layout/Grid/Grid'
import FeaturedProjectCard from '../../cards/FeaturedProjectCard/FeaturedProjectCard'
import ProjectCard from '../../cards/ProjectCard/ProjectCard'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import useProjects from '../../../hooks/useProjects'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

export default function Projects() {
  const { ref, style } = useIntersectionReveal()
  const { featured, projects, loading } = useProjects()

  return (
    <div ref={ref} style={style} className="relative overflow-hidden">
      <SceneDecor variants={['dots-tl', 'lines-bl']} />
      <Shape color="black"   size={20} animation="float"     delay={0}  className="top-4 right-10" />
      <Shape color="yellow"  size={14} animation="oscillate" delay={1.5} className="bottom-6 right-6" />

      <SectionTitle title="Projects" subtitle="Things I've built." />

      {loading ? (
        <div className="flex flex-col gap-6">
          <div className="card-brutal bg-white h-48 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-brutal bg-white h-40 animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {featured && <FeaturedProjectCard {...featured} />}
          <Grid columns={3} gap="gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}
