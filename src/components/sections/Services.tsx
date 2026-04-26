import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Code2, Smartphone, Cpu, Zap, Globe, ShoppingCart } from 'lucide-react'

const CFG = [
  { Icon: Code2,        c: '#7c3aed', bg: 'rgba(124,58,237,.09)', border: 'rgba(124,58,237,.22)' },
  { Icon: Smartphone,   c: '#0ea5e9', bg: 'rgba(14,165,233,.09)',  border: 'rgba(14,165,233,.22)'  },
  { Icon: Cpu,          c: '#8b5cf6', bg: 'rgba(139,92,246,.09)',  border: 'rgba(139,92,246,.22)'  },
  { Icon: Zap,          c: '#f59e0b', bg: 'rgba(245,158,11,.09)',  border: 'rgba(245,158,11,.22)'  },
  { Icon: Globe,        c: '#10b981', bg: 'rgba(16,185,129,.09)',  border: 'rgba(16,185,129,.22)'  },
  { Icon: ShoppingCart, c: '#ec4899', bg: 'rgba(236,72,153,.09)',  border: 'rgba(236,72,153,.22)'  },
]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <section
      id="servicios"
      style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
    >
      {/* Contenedor con padding garantizado via inline style */}
      <div style={{
        maxWidth: 1152,
        margin: '0 auto',
        padding: '80px 24px',
      }}>

        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: .45 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>
            {t('services.title')}{' '}
            <span className="gradient-text">{t('services.title_accent')}</span>
          </h2>
          <p className="section-copy" style={{ maxWidth: 560, margin: '0 auto' }}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Grid 3 columnas en desktop, 2 en tablet, 1 en móvil */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 20,
        }}>
          {items.map((item, i) => {
            const { Icon, c, bg, border } = CFG[i]
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: .4, delay: (i % 3) * .06 }}
                className="section-card"
                style={{
                  padding: '24px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  cursor: 'default',
                  transition: 'border-color .2s, box-shadow .2s, transform .2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = border
                  el.style.boxShadow = `0 0 0 1px ${border}, 0 8px 24px rgba(0,0,0,.08)`
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#e2e8f0'
                  el.style.boxShadow = '0 1px 3px rgba(0,0,0,.05), 0 4px 16px rgba(0,0,0,.04)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Icono */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: bg, border: `1px solid ${border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} color={c} aria-hidden />
                </div>

                {/* Texto */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16, fontWeight: 600, color: '#0f172a', lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#64748b', margin: 0 }}>
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
