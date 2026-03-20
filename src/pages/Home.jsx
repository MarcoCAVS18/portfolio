import Navbar from '../components/layout/Navbar/Navbar.jsx'
import Section from '../components/layout/Section/Section.jsx'
import Hero from '../components/sections/Hero/Hero.jsx'
import Projects from '../components/sections/Projects/Projects.jsx'
import Tools from '../components/sections/Tools/Tools.jsx'
import Timeline from '../components/sections/Timeline/Timeline.jsx'
import Contact from '../components/sections/Contact/Contact.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Section id="home">
          <Hero />
        </Section>

        <Section id="projects" className="bg-neutral-50">
          <Projects />
        </Section>

        <Section id="tools">
          <Tools />
        </Section>

        <Section id="timeline" className="bg-neutral-50">
          <Timeline />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>
      </main>
    </>
  )
}
