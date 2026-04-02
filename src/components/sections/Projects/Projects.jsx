import { ArrowUpRight } from 'lucide-react'
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

          <a
            href="https://github.com/MarcoCAVS18?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center justify-between w-full border-[3px] border-black bg-yellow-300 px-8 py-5 rounded-xl font-bold text-lg shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0px_black] hover:-translate-y-1 transition-all duration-150 cursor-pointer"
          >
            <span className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.3em] opacity-40 select-none"><span className="sm:hidden">· ·</span><span className="hidden sm:inline">· · · · · ·</span></span>
              <span>See all my projects</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.3em] opacity-40 select-none"><span className="sm:hidden">· ·</span><span className="hidden sm:inline">· · · · · ·</span></span>
              <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </span>
          </a>
        </>
      )}
    </div>
  )
}
