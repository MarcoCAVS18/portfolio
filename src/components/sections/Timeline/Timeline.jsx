import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionTitle from '../../ui/SectionTitle/SectionTitle'
import TimelineCard from '../../cards/TimelineCard/TimelineCard'
import Shape from '../../ui/Shape/Shape'
import SceneDecor from '../../ui/SceneDecor/SceneDecor'
import { timeline } from '../../../data/timeline'
import useIntersectionReveal from '../../../hooks/useIntersectionReveal'

export default function Timeline() {
  const { ref, style } = useIntersectionReveal()
  const timelineRef = useRef(null)
  const endRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 30%'],
  })

  const { scrollYProgress: endProgress } = useScroll({
    target: endRef,
    offset: ['start 90%', 'end 45%'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const stillColor    = useTransform(endProgress, [0,    0.38], ['#d4d4d4', '#fbbf24'])
  const learningColor = useTransform(endProgress, [0.28, 0.66], ['#d4d4d4', '#fbbf24'])
  const subtitleColor = useTransform(endProgress, [0.55, 0.92], ['#a3a3a3', '#525252'])

  return (
    <div ref={ref} style={style} className="relative overflow-hidden">
      <SceneDecor variants={['lines-tr', 'dots-br']} />
      <Shape color="black"   size={18} animation="spin"  delay={0}   className="top-6 right-8" />
      <Shape color="outline" size={28} animation="float" delay={1.5} className="bottom-8 left-6" />

      <SectionTitle
        title="Timeline"
        subtitle="From Rosario to New Zealand — a developer's journey in motion."
      />

      <div ref={timelineRef} className="relative">
        {/* Track (full height, faint) — desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-px" />

        {/* Animated progress line — desktop only */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black -translate-x-px origin-top"
          style={{ scaleY: lineScaleY }}
        />

        <div>
          {timeline.map((entry, i) => (
            <TimelineCard
              key={entry.id}
              {...entry}
              align={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>

      {/* End-of-timeline statement */}
      <div ref={endRef} className="mt-12 pb-4 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-300 mb-6 select-none">
          — present
        </p>
        <div
          className="font-black uppercase leading-[0.88] tracking-tighter select-none"
          style={{ fontSize: 'clamp(4.5rem, 14vw, 12rem)' }}
        >
          <motion.div style={{ color: stillColor }}>Still</motion.div>
          <motion.div style={{ color: learningColor }}>Learning.</motion.div>
        </div>
        <motion.p
          style={{ color: subtitleColor }}
          className="mt-6 text-base md:text-lg font-medium max-w-sm mx-auto leading-relaxed"
        >
          Every project, every bug, every late night — all part of the process.
        </motion.p>
      </div>
    </div>
  )
}
