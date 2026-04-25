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
    setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const links = [
    { label: t('nav.services'), id: '#servicios' },
    { label: t('nav.about'),    id: '#nosotros'  },
    { label: t('nav.contact'),  id: '#contacto'  },
  ]

  const navBg = scrolled
    ? 'rgba(8,8,18,0.9)'
    : 'transparent'
  const navBorder = scrolled
    ? '1px solid rgba(255,255,255,0.07)'
    : '1px solid transparent'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: navBorder, transition: 'all 0.3s ease',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: 68 }}>

          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Logo height={30} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.id} href={l.id}
                onClick={e => { e.preventDefault(); goto(l.id) }}
                style={{ color: '#94a3b8', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => i18n.changeLanguage(isEN ? 'es' : 'en')}
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                color: '#64748b', padding: '6px 12px', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              {isEN ? 'EN' : 'ES'}
            </button>
            <a href="#contacto" onClick={e => { e.preventDefault(); goto('#contacto') }}
              style={{
                fontSize: 13, fontWeight: 600, color: '#fff',
                padding: '9px 20px', borderRadius: 10,
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                textDecoration: 'none', transition: 'opacity .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '.88'; e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,.5)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => i18n.changeLanguage(isEN ? 'es' : 'en')}
              style={{ fontSize: 11, fontWeight: 700, color: '#64748b', padding: '5px 10px', borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
              {isEN ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setOpen(!open)} style={{ color: '#f1f5f9', padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(4px)' }}
              className="md:hidden" onClick={() => setOpen(false)} />

            <motion.nav key="dr"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50, width: 280,
                background: '#0e0e1c', borderLeft: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column', paddingTop: 80, paddingBottom: 32, paddingLeft: 24, paddingRight: 24,
              }}
              className="md:hidden"
            >
              <button onClick={() => setOpen(false)}
                style={{ position: 'absolute', top: 16, right: 16, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {links.map((l, i) => (
                  <motion.a key={l.id} href={l.id}
                    onClick={e => { e.preventDefault(); goto(l.id) }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      color: '#94a3b8', fontSize: 15, fontWeight: 500, textDecoration: 'none',
                      padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                      transition: 'color .2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <motion.a href="#contacto" onClick={e => { e.preventDefault(); goto('#contacto') }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }}
                style={{
                  marginTop: 28, textAlign: 'center', fontSize: 13, fontWeight: 600,
                  color: '#fff', padding: '12px 20px', borderRadius: 10, textDecoration: 'none',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                }}
              >
                {t('nav.cta')}
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
