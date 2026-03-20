const COLS = 4
const ROWS = 4
const cells = Array.from({ length: COLS * ROWS }, (_, i) => i)

export default function BrutalistLoader() {
  return (
    <div
      className="border-[3px] border-black"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        width: 88,
        height: 88,
      }}
      aria-label="Loading"
    >
      {cells.map(i => {
        const row = Math.floor(i / COLS)
        const col = i % COLS
        const isBlack = (row + col) % 2 === 0
        return (
          <div
            key={i}
            className="brutal-cell"
            style={{
              backgroundColor: isBlack ? '#000' : '#fff',
              animationDelay: `${(i * 55) % 800}ms`,
            }}
          />
        )
      })}
    </div>
  )
}
