import { cn } from '../../../utils/cn'

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}

export default function Grid({ columns = 3, gap = 'gap-6', children, className }) {
  return (
    <div className={cn('grid', colsMap[columns] ?? colsMap[3], gap, className)}>
      {children}
    </div>
  )
}
