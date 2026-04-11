import { useState } from 'react'
import { Star, Clock, TrendingUp, Zap, Bike, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from '../../ui/Badge/Badge'
import StackList from '../../ui/StackList/StackList'
import Button from '../../ui/Button/Button'
import { trackEvent } from '../../../services/firebase/analytics'

const PINK = '#EC4899'

// phone_035.png actual dimensions: 1131 × 2291 → ratio 2.026
const RATIO = 2291 / 1131 // ≈ 2.026

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const phoneVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

/**
 * PhoneFrame
 * Uses mix-blend-mode:multiply on the iPhone JPG so the white screen area
 * becomes "transparent", revealing the children layer underneath.
 *
 * Screen area offsets calibrated for phone_035.png:
 *   top: 8.8%  |  left: 7.2%  |  width: 85.6%  |  height: 87.8%
 */
function PhoneFrame({ children, width }) {
  const height = Math.round(width * RATIO)

  return (
    <div style={{ position: 'relative', width, height, flexShrink: 0 }}>
      {/* Screen content — calibrated to the transparent screen hole in the PNG */}
      <div
        style={{
          position: 'absolute',
          top: '2.8%',
          left: '4%',
          width: '92%',
          height: '95.2%',
          borderRadius: Math.round(width * 0.09),
          overflow: 'hidden',
          background: '#000',
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Frame overlay — transparent PNG, no blend mode needed */}
      <img
        src="/images/frame-iphone/phone_035.png"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          userSelect: 'none',
        }}
      />
    </div>
  )
}

/**
 * ScrollingScreenshot
 * Auto-scrolls the full-page screenshot from top to bottom and back.
 * scrollPx = total pixels to travel at the rendered display size.
 */
function ScrollingScreenshot({ src, alt, scrollPx, duration = 18 }) {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        animate={{ y: [0, -scrollPx] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
      />
    </div>
  )
}

/**
 * OraryLandingMini
 * Visual recreation of orary.app/landing inside the phone frame.
 * Uses the real background video + key UI elements from Landing.jsx.
 */
function OraryLandingMini() {
  const [videoReady, setVideoReady] = useState(false)

  const topFeatures = [
    { icon: Clock,      label: 'Track Shifts',   color: '#F59E0B' },
    { icon: TrendingUp, label: 'Analytics',       color: '#6366F1' },
    { icon: Zap,        label: 'Live Mode',       color: PINK },
  ]
  const bottomFeatures = [
    { icon: Bike, label: 'Delivery',           color: '#10B981' },
    { icon: null, label: '🇦🇺 Australia 88',   color: '#FFD700' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0f172a' }}>

      {/* Background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.50)', zIndex: 1 }} />
        <video
          autoPlay loop muted playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.7s',
          }}
        >
          <source src="/videos/sample_0.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '10px 8px',
          gap: 8,
          overflowY: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{
            background: '#fff', borderRadius: '50%',
            padding: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            <img src="/images/orary-logo.svg" alt="Orary" style={{ width: 22, height: 22 }} />
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Orary</span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 7, textAlign: 'center', lineHeight: 1.3 }}>
            Know what you earn before you earn it.
          </span>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {topFeatures.map(f => (
              <div
                key={f.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  padding: '2px 6px', borderRadius: 20,
                  border: `1px solid ${f.color}40`,
                  background: `${f.color}20`,
                  fontSize: 6, color: 'rgba(255,255,255,0.9)',
                }}
              >
                <f.icon size={7} style={{ color: f.color }} />
                {f.label}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {bottomFeatures.map(f => (
              <div
                key={f.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  padding: '2px 6px', borderRadius: 20,
                  border: `1px solid ${f.color}40`,
                  background: `${f.color}20`,
                  fontSize: 6, color: 'rgba(255,255,255,0.9)',
                }}
              >
                {f.icon
                  ? <f.icon size={7} style={{ color: f.color }} />
                  : <span style={{ fontSize: 7 }}>🇦🇺</span>
                }
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTA card */}
        <div style={{
          background: '#fff', borderRadius: 10,
          padding: '10px 10px',
          width: '100%', maxWidth: 160,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {/* Get started button */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            background: PINK, borderRadius: 7,
            padding: '6px 0',
            color: '#fff', fontWeight: 600, fontSize: 8,
            cursor: 'default',
          }}>
            Get started free <ArrowRight size={8} />
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            <span style={{ fontSize: 6, color: '#9ca3af' }}>Already have an account?</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          {/* Sign in button */}
          <div style={{
            textAlign: 'center',
            border: '1px solid #e5e7eb', borderRadius: 7,
            padding: '5px 0',
            color: '#374151', fontSize: 8, fontWeight: 500,
            cursor: 'default',
          }}>
            Sign in
          </div>

          <p style={{ textAlign: 'center', fontSize: 5.5, color: '#9ca3af', margin: 0 }}>
            Free worldwide · No credit card needed
          </p>
        </div>
      </div>
    </div>
  )
}

function PhoneScreens() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center py-6 px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left — screenshot2 (706×5352 → scrollPx ≈ 933 at display size) */}
      <motion.div
        variants={phoneVariants}
        style={{
          rotate: -10,
          translateY: 30,
          translateX: 28,
          zIndex: 1,
          filter: 'drop-shadow(14px 30px 44px rgba(0,0,0,0.42))',
        }}
      >
        <PhoneFrame width={185}>
          <ScrollingScreenshot src="/images/screenshot2.png" alt="Orary — pantalla 2" scrollPx={933} duration={20} />
        </PhoneFrame>
      </motion.div>

      {/* Center — Orary landing recreation */}
      <motion.div
        variants={phoneVariants}
        style={{
          rotate: 0,
          translateY: 0,
          zIndex: 3,
          filter: 'drop-shadow(0px 38px 58px rgba(0,0,0,0.52))',
        }}
      >
        <PhoneFrame width={255}>
          <OraryLandingMini />
        </PhoneFrame>
      </motion.div>

      {/* Right — screenshot3 (706×8825 → scrollPx ≈ 1771 at display size) */}
      <motion.div
        variants={phoneVariants}
        style={{
          rotate: 10,
          translateY: 30,
          translateX: 0,
          zIndex: 1,
          filter: 'drop-shadow(-14px 30px 44px rgba(0,0,0,0.42))',
        }}
      >
        <PhoneFrame width={185}>
          <ScrollingScreenshot src="/images/screenshot3.png" alt="Orary — pantalla 3" scrollPx={1771} duration={32} />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  )
}

export default function FeaturedProjectCard({ title, description, stack = [], demoUrl, githubUrl, logo }) {
  function open(event, url) {
    trackEvent(event, { project_title: title })
    window.open(url, '_blank')
  }

  return (
    <div className="w-full border-[3px] border-black shadow-[8px_8px_0px_black] mb-8 grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left — content block ── */}
      <div className="bg-black p-8 lg:p-12 flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge icon={<Star size={11} />}>Featured</Badge>
          </div>

          <div className="flex items-center gap-4">
            {logo && (
              <img
                src={logo}
                alt={`${title} logo`}
                className="h-12 w-12 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            )}
            <h3 className="text-4xl lg:text-5xl font-black text-white leading-none">{title}</h3>
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">{description}</p>

          <StackList stack={stack} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
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

      {/* ── Right — phone mockups ── */}
      <div className="bg-[#F0EFE9] border-l-[3px] border-black min-h-[480px] lg:min-h-0 overflow-visible">
        <PhoneScreens />
      </div>

    </div>
  )
}
