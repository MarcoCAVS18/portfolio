import Chip from '../Chip/Chip'

export default function StackList({ stack = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <Chip key={tech}>{tech}</Chip>
      ))}
    </div>
  )
}
