import { Star } from 'lucide-react'
import Badge from '../../ui/Badge/Badge'
import StackList from '../../ui/StackList/StackList'
import Button from '../../ui/Button/Button'
import { trackEvent } from '../../../services/firebase/analytics'
import PhoneMockup from '../../PhoneMockup/PhoneMockup'

const PURPLE_GRADIENT = 'linear-gradient(135deg, #C9B6E4 0%, #B7A0DB 100%)'
const SQUARE_GRADIENT = 'linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)'

export default function FeaturedProjectCard({ title, description, stack = [], demoUrl, githubUrl, logo }) {
  function open(event, url) {
    trackEvent(event, { project_title: title })
    window.open(url, '_blank')
  }

  return (
    <div
      className="card-brutal relative mb-8 transition-all duration-150 hover:-translate-y-2 hover:shadow-[10px_10px_0px_black] p-6 lg:p-8"
      style={{ background: PURPLE_GRADIENT }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Mockup de phones con capturas */}
        <div
          className="rounded-xl border-[3px] border-black shadow-[4px_4px_0px_black] overflow-hidden"
          style={{ background: SQUARE_GRADIENT }}
        >
          <PhoneMockup />
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-center gap-4 flex-1">

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="h-14 w-14 object-contain"
                  style={{ filter: 'brightness(0) drop-shadow(3px 3px 0 black)' }}
                />
              )}
              <h3 className="text-3xl font-black brutal-shadow-text">{title}</h3>
            </div>
            <Badge>
              <span className="flex items-center gap-1">
                <Star size={11} />
                Featured
              </span>
            </Badge>
          </div>

          <p className="text-neutral-900 max-w-2xl">{description}</p>
          <StackList stack={stack} />

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            {demoUrl && (
              <Button variant="primary" onClick={() => open('project_demo_click', demoUrl)}>
                View Demo
              </Button>
            )}
            {githubUrl && (
              <Button variant="outline" onClick={() => open('project_github_click', githubUrl)}>
                View Code
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
