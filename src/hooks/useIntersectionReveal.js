import { useInView } from 'react-intersection-observer'

export default function useIntersectionReveal(options = {}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  })

  const style = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 200ms ease-out, transform 200ms ease-out',
  }

  return { ref, style }
}
