import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Code2, Smartphone, Cpu, Zap, Globe, ShoppingCart } from 'lucide-react'

const CFG = [
  { Icon: Code2,        c: '#7c3aed', bg: 'rgba(124,58,237,.14)' },
  { Icon: Smartphone,   c: '#06b6d4', bg: 'rgba(6,182,212,.14)'  },
  { Icon: Cpu,          c: '#a855f7', bg: 'rgba(168,85,247,.14)' },
  { Icon: Zap,          c: '#f59e0b', bg: 'rgba(245,158,11,.14)' },
  { Icon: Globe,        c: '#10b981', bg: 'rgba(16,185,129,.14)' },
  { Icon: ShoppingCart, c: '#ec4899', bg: 'rgba(236,72,153,.14)' },
]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <section id="servicios" className="py-20 sm:py-28" style={{ backgroundColor: '#0e0e1c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 12 }}>
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>
            {t('services.title')}{' '}
            <span className="gradient-text">{t('services.title_accent')}</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: 16, lineHeight: 1.7, color: '#64748b' }}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const { Icon, c, bg } = CFG[i]
            return (
              <motion.article key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .5, delay: (i % 3) * .07 }}
                style={{
                  backgroundColor: '#12121f',
                  border: '1px solid #1e1e32',
                  borderRadius: 16, padding: '28px 24px',
                  display: 'flex', flexDirection: 'column', gap: 18,
                  transition: 'border-color .25s, box-shadow .25s, transform .25s', cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = c + '60'
                  el.style.boxShadow = `0 0 28px ${c}22, 0 10px 30px rgba(0,0,0,.4)`
                  el.style.transform = 'translateY(-5px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#1e1e32'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, border: `1px solid ${c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={c} aria-hidden />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#64748b' }}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
