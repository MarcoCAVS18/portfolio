import { useState } from 'react'
import Container from '../Container/Container'
import NavLink from './NavLink'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#tools',    label: 'Tools' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#contact',  label: 'Contact', cta: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() { setIsOpen(o => !o) }
  function close()  { setIsOpen(false) }

  return (
    <header className="sticky top-0 z-50 bg-white border-b-[3px] border-black relative">
      <Container>
        <div className="flex items-center justify-between h-20">

          {/* Brand */}
          <a
            href="#home"
            onClick={e => {
              e.preventDefault(); close()
              const target = document.querySelector('#home')
              if (target) {
                const navHeight = document.querySelector('header')?.offsetHeight ?? 80
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' })
              }
            }}
            className="font-black text-xl uppercase tracking-tight border-[3px] border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors duration-150"
          >
            marco.dev
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={toggle}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="md:hidden border-[3px] border-black p-2 bg-transparent cursor-pointer focus-visible:outline-[3px] focus-visible:outline-yellow-400 focus-visible:outline-offset-[3px]"
          >
            <span className={`block w-6 h-[3px] bg-black transition-all duration-150 origin-center ${isOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[3px] bg-black my-[5px] transition-all duration-150 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[3px] bg-black transition-all duration-150 origin-center ${isOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-stretch h-full">
            <ul className="flex items-stretch">
              {links.map(({ href, label, cta }) => (
                <li key={href} className="border-l-[3px] border-black flex items-stretch">
                  <NavLink href={href} cta={cta} onClick={close}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </Container>

      {/* Mobile dropdown — full width, outside Container */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b-[3px] border-black z-[1000] transition-all duration-150 ${isOpen ? 'flex flex-col' : 'hidden'}`}
      >
        <ul>
          {links.map(({ href, label, cta }) => (
            <li key={href} className="border-t-[3px] border-black">
              <NavLink href={href} cta={cta} onClick={close} mobile>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
