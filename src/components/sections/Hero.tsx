import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

const PILLS = ['React', 'Flutter', 'Node.js', 'Python', 'AWS', 'TypeScript']

export default function Hero() {
  const { t } = useTranslation()
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 68 }}>

      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
        <div className="orb-a" style={{
          position: 'absolute', width: 700, height: 700, top: -220, left: -200,
          background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,.65) 0%, transparent 60%)',
          filter: 'blur(80px)', borderRadius: '50%',
        }} />
        <div className="orb-b" style={{
          position: 'absolute', width: 600, height: 600, bottom: -180, right: -150,
          background: 'radial-gradient(circle at 60% 60%, rgba(6,182,212,.55) 0%, transparent 60%)',
          filter: 'blur(75px)', borderRadius: '50%',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }} />
        {/* Fade edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 35%, rgba(8,8,18,.9) 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)', borderRadius: 999,
            padding: '7px 16px', fontSize: 13, fontWeight: 500, color: '#94a3b8',
          }}
        >
          <Sparkles size={13} color="#7c3aed" aria-hidden />
          {t('hero.badge')}
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}
          className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t('hero.headline1')}
          <span className="block gradient-text" style={{ marginTop: 4 }}>
            {t('hero.headline2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .22 }}
          className="max-w-xl"
          style={{ fontSize: 17, lineHeight: 1.7, color: '#94a3b8' }}
        >
          {t('hero.subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .36 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto"
          style={{ gap: 12 }}
        >
          <button onClick={() => goto('servicios')}
            className="w-full sm:w-auto"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#fff',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', border: 'none', cursor: 'pointer',
              transition: 'opacity .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '.88'; e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,.55)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {t('hero.cta_primary')} <ChevronDown size={16} aria-hidden />
          </button>
          <button onClick={() => goto('contacto')}
            className="w-full sm:w-auto"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#f1f5f9',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
              transition: 'background .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            {t('hero.cta_secondary')} <ArrowRight size={16} aria-hidden />
          </button>
        </motion.div>

        {/* Tech pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .7 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, paddingTop: 8 }}
          aria-hidden
        >
          {PILLS.map(p => (
            <span key={p} style={{
              fontSize: 12, fontWeight: 500, color: '#64748b',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999, padding: '5px 14px',
            }}>{p}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        aria-hidden
      >
        <span style={{ fontSize: 10, color: '#475569', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={15} className="arrow-bounce" color="#475569" />
      </motion.div>
    </section>
  )
}
