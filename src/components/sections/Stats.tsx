import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

function useCount(target: number, duration: number, active: boolean) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setV(Math.round((1 - (1 - p) ** 3) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, active])
  return v
}

function Stat({ value, suffix, label, delay, active }: { value: number; suffix: string; label: string; delay: number; active: boolean }) {
  const n = useCount(value, 1600, active)
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        textAlign: 'center', padding: '28px 16px',
        backgroundColor: '#12121f', border: '1px solid #1e1e32', borderRadius: 16,
      }}>
      <span aria-label={`${value}${suffix}`}
        style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 44, fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {n}{suffix}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#64748b', lineHeight: 1.3 }}>{label}</span>
    </motion.div>
  )
}

export default function Stats() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  const items = t('stats.items', { returnObjects: true }) as { value: number; suffix: string; label: string }[]

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: .2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={ref} className="py-20 sm:py-28"
      style={{ backgroundColor: '#080812', borderTop: '1px solid #1e1e32', borderBottom: '1px solid #1e1e32', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle gradient accent */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,.06) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55 }}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem]"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: '#f1f5f9' }}>
            {t('stats.title')}{' '}
            <span className="gradient-text">{t('stats.title_accent')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <Stat key={i} value={item.value} suffix={item.suffix} label={item.label} delay={i * .08} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
