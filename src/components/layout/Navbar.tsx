import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Logo from '@/components/ui/Logo'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isEN = i18n.language.startsWith('en')
  const goto = (id: string) => {
    setOpen(false)
    setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  const links = [
    { label: t('nav.services'), id: '#servicios' },
    { label: t('nav.about'),    id: '#nosotros'  },
    { label: t('nav.contact'),  id: '#contacto'  },
  ]

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,.06)' : 'none',
        transition: 'all 0.25s ease',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4" style={{ minHeight: 68 }}>

          <a href="#" className="shrink-0" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Logo height={30} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l.id} href={l.id} onClick={e => { e.preventDefault(); goto(l.id) }}
                style={{ color: '#64748b', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <button onClick={() => i18n.changeLanguage(isEN ? 'es' : 'en')}
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
                color: '#64748b', padding: '6px 12px', borderRadius: 8,
                background: '#f1f5f9', border: '1px solid #e2e8f0', transition: 'all .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = '#cbd5e1' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0' }}
            >
              {isEN ? 'EN' : 'ES'}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button onClick={() => i18n.changeLanguage(isEN ? 'es' : 'en')}
              style={{ fontSize: 11, fontWeight: 700, color: '#64748b', padding: '5px 10px', borderRadius: 7, background: '#f1f5f9', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              {isEN ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setOpen(!open)}
              style={{ color: '#0f172a', padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(15,23,42,.4)', backdropFilter: 'blur(4px)' }}
              className="md:hidden" onClick={() => setOpen(false)} />
            <motion.nav key="dr"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
                width: 'min(88vw, 320px)', background: '#fff',
                borderLeft: '1px solid #e2e8f0', boxShadow: '-8px 0 32px rgba(0,0,0,.1)',
                display: 'flex', flexDirection: 'column', paddingTop: 80, paddingBottom: 28, paddingLeft: 20, paddingRight: 20,
              }}
              className="md:hidden"
            >
              <button onClick={() => setOpen(false)}
                style={{ position: 'absolute', top: 16, right: 16, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {links.map((l, i) => (
                  <motion.a key={l.id} href={l.id}
                    onClick={e => { e.preventDefault(); goto(l.id) }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * .06 }}
                    style={{
                      color: '#475569', fontSize: 15, fontWeight: 500, textDecoration: 'none',
                      padding: '14px 0', borderBottom: '1px solid #f1f5f9', transition: 'color .15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
