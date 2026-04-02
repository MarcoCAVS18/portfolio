import StackList from '../../ui/StackList/StackList'
import Button from '../../ui/Button/Button'
import Badge from '../../ui/Badge/Badge'
import { trackEvent } from '../../../services/firebase/analytics'

export default function ProjectCard({ title, description, stack = [], demoUrl, githubUrl, logo, builtWithClaude }) {
  function open(event, url) {
    trackEvent(event, { project_title: title })
    window.open(url, '_blank')
  }

  return (
    <div className="border-[3px] border-black shadow-[6px_6px_0px_black] bg-white flex flex-col h-full transition-all duration-150 hover:-translate-y-1 hover:shadow-[10px_10px_0px_black]">

      {/* Franja amarilla superior */}
      <div className="h-3 bg-yellow-300 border-b-[3px] border-black" />

      <div className="p-5 flex flex-col gap-4 h-full">

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {logo && (
              <img
                src={logo}
                alt={`${title} logo`}
                className="h-8 w-8 object-contain"
                style={{ filter: 'brightness(0) drop-shadow(2px 2px 0 black)' }}
              />
            )}
            <h3 className="text-xl font-black leading-tight">{title}</h3>
          </div>
          {builtWithClaude && (
            <Badge icon="/images/SVG/claude-color.svg" variant="orange">Built with Claude</Badge>
          )}
        </div>

        <p className="text-sm text-neutral-600 flex-1">{description}</p>

        <StackList stack={stack} />

        <div className="flex gap-2 pt-1">
          {demoUrl && demoUrl !== '#' && <Button variant="primary" onClick={() => open('project_demo_click', demoUrl)}>View Demo</Button>}
          {demoUrl === '#' && <Button variant="primary" disabled className="opacity-50 cursor-not-allowed">Coming Soon</Button>}
          {githubUrl && <Button variant="outline" onClick={() => open('project_github_click', githubUrl)}>View Code</Button>}
        </div>

      </div>
    </div>
  )
}
