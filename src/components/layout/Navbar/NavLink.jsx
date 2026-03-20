export default function NavLink({ href, children, cta = false, mobile = false, onClick }) {
  function handleClick(e) {
    e.preventDefault()
    onClick?.()
    const target = document.querySelector(href)
    if (target) {
      const navHeight = document.querySelector('header')?.offsetHeight ?? 80
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const base = 'block text-sm font-bold uppercase tracking-wide transition-colors duration-150 focus-visible:outline-[3px] focus-visible:outline-yellow-400 focus-visible:outline-offset-[3px]'
  const layout = mobile ? 'py-6 text-center' : 'flex items-center h-full px-6'
  const colors = cta
    ? 'bg-yellow-400 text-black hover:bg-black hover:text-yellow-400'
    : 'hover:bg-black hover:text-white'

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${base} ${layout} ${colors}`}
    >
      {children}
    </a>
  )
}
