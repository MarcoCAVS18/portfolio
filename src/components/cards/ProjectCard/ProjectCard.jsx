import StackList from '../../ui/StackList/StackList'
import Button from '../../ui/Button/Button'
import CardBackground from '../CardBackground/CardBackground'
import { trackEvent } from '../../../services/firebase/analytics'

export default function ProjectCard({ title, description, stack = [], demoUrl, githubUrl, preview, logo }) {
  function open(event, url) {
    trackEvent(event, { project_title: title })
    window.open(url, '_blank')
  }

  return (
    <div className="card-brutal relative flex flex-col h-full transition-all duration-150 hover:-translate-y-1 hover:shadow-[8px_8px_0px_black]">
      <CardBackground preview={preview} />

      <div className="relative z-10 p-5 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-2">
          {logo && <img src={logo} alt={`${title} logo`} className="h-8 w-8 object-contain" style={{ filter: 'brightness(0) drop-shadow(2px 2px 0 black)' }} />}
          <h3 className="text-xl font-black brutal-shadow-text">{title}</h3>
        </div>

        <p className="text-sm text-neutral-700 flex-1">{description}</p>
        <StackList stack={stack} />

        <div className="flex gap-2 pt-1">
          {demoUrl && <Button variant="primary" onClick={() => open('project_demo_click', demoUrl)}>View Demo</Button>}
          {githubUrl && <Button variant="outline" onClick={() => open('project_github_click', githubUrl)}>View Code</Button>}
        </div>
      </div>
    </div>
  )
}
