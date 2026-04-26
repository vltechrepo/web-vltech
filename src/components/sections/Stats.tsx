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

function Stat({ value, suffix, label, delay, active }: {
  value: number; suffix: string; label: string; delay: number; active: boolean
}) {
  const n = useCount(value, 1400, active)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .4, delay }}
      className="section-card"
      style={{
        padding: '32px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        aria-label={`${value}${suffix}`}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {n}{suffix}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: '#64748b' }}>{label}</div>
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: .25 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <section
      id="nosotros"
      ref={ref}
      style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .45 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 className="section-title" style={{ marginBottom: 10 }}>
            {t('stats.title')}{' '}
            <span className="gradient-text">{t('stats.title_accent')}</span>
          </h2>
          <p className="section-copy">{t('contact.subtitle')}</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}>
          {items.map((item, i) => (
            <Stat
              key={i}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              delay={i * .07}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
