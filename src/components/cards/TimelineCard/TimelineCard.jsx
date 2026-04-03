import { Lock } from 'lucide-react'
import { cn } from '../../../utils/cn'
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal'

function CardBody({ year, title, description, location, skills, projects, isRight }) {
  const visibleProjects = projects.slice(0, 2)
  const hiddenProjects = projects.slice(2)

  return (
    <div
      className={cn(
        'border-2 border-black bg-white p-4',
        isRight ? 'shadow-[-4px_4px_0px_black]' : 'shadow-[4px_4px_0px_black]',
      )}
    >
      {/* Year + location */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-500">
          {year}
        </span>
        {location && (
          <span className="text-xs font-medium text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">
            {location}
          </span>
        )}
      </div>

      <h3 className="text-lg font-black leading-tight">{title}</h3>
      <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">{description}</p>

      {/* Stack + Projects — same row */}
      {((skills && skills.length > 0) || (projects && projects.length > 0)) && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mr-1">
                Stack
              </span>
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold bg-yellow-100 border border-black px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mr-1">
                Projects
              </span>
              {visibleProjects.map((p) => {
                const hasLink = !!p.url
                const base = 'inline-flex items-center gap-1 text-xs font-bold bg-black text-white border border-black px-2 py-0.5'
                if (hasLink) {
                  return (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(base, 'hover:bg-yellow-300 hover:text-black transition-colors')}
                    >
                      {p.private && <Lock size={9} aria-label="Private repository" />}
                      {p.name}
                    </a>
                  )
                }
                return (
                  <span key={p.name} className={cn(base, 'select-none opacity-70')}>
                    {p.name}
                  </span>
                )
              })}
              {hiddenProjects.length > 0 && (
                <div className="relative group/tooltip">
                  <button className="text-xs font-black border-2 border-black px-2 py-0.5 hover:bg-yellow-300 transition-colors cursor-default">
                    ›
                  </button>
                  <div
                    className={cn(
                      'absolute bottom-full mb-1.5 bg-black text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap',
                      'opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-20',
                      isRight ? 'right-0' : 'left-0',
                    )}
                  >
                    {hiddenProjects.map(p => p.name).join(' · ')}
                    <span
                      className={cn(
                        'absolute top-full border-4 border-transparent border-t-black',
                        isRight ? 'right-3' : 'left-3',
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default function TimelineCard({ year, title, description, location, skills, projects = [], align }) {
  const isRight = align === 'right'
  const body = (
    <CardBody
      year={year}
      title={title}
      description={description}
      location={location}
      skills={skills}
      projects={projects}
      isRight={isRight}
    />
  )

  return (
    <div className="relative pb-10">
      {/* ── Desktop: center dot ── */}
      <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_black]" />

      {/* ── Desktop: zigzag halves ── */}
      <div className="hidden md:flex items-start">
        <div className="w-1/2 pr-5">
          {!isRight && <ScrollReveal direction="left">{body}</ScrollReveal>}
        </div>
        <div className="w-1/2 pl-5">
          {isRight && <ScrollReveal direction="right">{body}</ScrollReveal>}
        </div>
      </div>

      {/* ── Mobile: dot-left connector + full-width card ── */}
      <div className="flex gap-4 md:hidden">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-4 h-4 rounded-full border-2 border-black bg-yellow-300 mt-1 shadow-[2px_2px_0px_black]" />
          <div className="w-0.5 bg-black flex-1 mt-2" />
        </div>
        <div className="flex-1 pb-2">
          <ScrollReveal direction="up">{body}</ScrollReveal>
        </div>
      </div>
    </div>
  )
}
