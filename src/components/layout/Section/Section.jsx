import { cn } from '../../../utils/cn'
import Container from '../Container/Container'

export default function Section({ id, children, className }) {
  return (
    <section id={id} className={cn('py-10', className)}>
      <Container>
        {children}
      </Container>
    </section>
  )
}
