import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import InfiniteGrid from '@/components/ui/InfiniteGrid'

const PILLS = ['React', 'Flutter', 'Node.js', 'Python', 'AWS', 'TypeScript']

export default function Hero() {
  const { t } = useTranslation()
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      position: 'relative',
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#ffffff',
    }}>
      {/* ── Infinite Grid background ── */}
      <InfiniteGrid
        size={44}
        lineColor="#7c3aed"
        flashlightRadius={300}
        baseOpacity={0.07}
        revealOpacity={0.45}
        speed={0.3}
      />

      {/* Decorative colour blobs on top of the grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
        <div className="orb-a" style={{
          position: 'absolute',
          width: 'min(680px, 100vw)', height: 'min(680px, 100vw)',
          top: -220, left: -180,
          background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,.13) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        <div className="orb-b" style={{
          position: 'absolute',
          width: 'min(580px, 90vw)', height: 'min(580px, 90vw)',
          bottom: -160, right: -140,
          background: 'radial-gradient(circle at 60% 60%, rgba(14,165,233,.11) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        {/* Soft vignette so edges stay clean */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 40%, rgba(255,255,255,.96) 100%)',
        }} />
      </div>

      {/* Content */}
      <div
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 20, paddingTop: 96, paddingBottom: 72,
        }}
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .1 }}
          className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1.07, color: '#0f172a' }}
        >
          {t('hero.headline1')}
          <span className="block gradient-text" style={{ marginTop: 4 }}>
            {t('hero.headline2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .2 }}
          className="max-w-xl"
          style={{ fontSize: 16, lineHeight: 1.75, color: '#64748b' }}
        >
          {t('hero.subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .3 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto justify-center"
          style={{ gap: 10 }}
        >
          <button onClick={() => goto('servicios')} className="w-full sm:w-auto"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              height: 48, padding: '0 26px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, color: '#fff',
              background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)',
              border: 'none', cursor: 'pointer',
              transition: 'opacity .18s, box-shadow .18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,.35)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {t('hero.cta_primary')} <ChevronDown size={15} aria-hidden />
          </button>
          <button onClick={() => goto('contacto')} className="w-full sm:w-auto"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              height: 48, padding: '0 26px', borderRadius: 10,
              fontSize: 14, fontWeight: 600, color: '#0f172a',
              background: '#fff', border: '1.5px solid #e2e8f0', cursor: 'pointer',
              transition: 'border-color .18s, box-shadow .18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {t('hero.cta_secondary')} <ArrowRight size={15} aria-hidden />
          </button>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .55 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 7, marginTop: 4 }}
          aria-hidden
        >
          {PILLS.map(p => (
            <span key={p} style={{
              fontSize: 12, fontWeight: 500, color: '#94a3b8',
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: 999, padding: '4px 12px',
            }}>{p}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="hidden md:flex"
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        aria-hidden
      >
        <span style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '.18em', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={14} className="arrow-bounce" color="#94a3b8" />
      </motion.div>
    </section>
  )
}
