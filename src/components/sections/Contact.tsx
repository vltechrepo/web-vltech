import { useState, useRef, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const IStyle: React.CSSProperties = {
  width: '100%', backgroundColor: '#0a0a16', color: '#f1f5f9',
  border: '1px solid #1e1e32', borderRadius: 10, padding: '11px 14px',
  fontSize: 14, outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'Inter, sans-serif',
}

function FInput({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b' }}>
        {label}{req && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
      </span>
      {children}
    </label>
  )
}

function useInputFocus() {
  return {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = '#7c3aed'
      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.15)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = '#1e1e32'
      e.target.style.boxShadow = 'none'
    },
  }
}

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const focus = useInputFocus()

  const f = t('contact.form', { returnObjects: true }) as Record<string, string | string[]>
  const services = f.services as string[]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST', body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); formRef.current?.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const CARD: React.CSSProperties = { backgroundColor: '#12121f', border: '1px solid #1e1e32', borderRadius: 16, padding: '32px 28px' }

  return (
    <section id="contacto" className="py-20 sm:py-28" style={{ backgroundColor: '#0e0e1c' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 12 }}>
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem]"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>
            {t('contact.title')}{' '}
            <span className="gradient-text">{t('contact.title_accent')}</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ fontSize: 16, lineHeight: 1.7, color: '#64748b' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .55 }}
            className="lg:col-span-2" style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, color: '#f1f5f9', marginBottom: 8 }}>
                {t('i18n.language') === 'en' ? 'Get in touch' : 'Escríbenos'}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#64748b' }}>{t('contact.subtitle')}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { Icon: Mail, c: '#7c3aed', bg: 'rgba(124,58,237,.12)', label: t('contact.info.email_label'), val: t('contact.info.email'), href: `mailto:${t('contact.info.email')}` },
                { Icon: MapPin, c: '#06b6d4', bg: 'rgba(6,182,212,.12)', label: t('contact.info.location_label'), val: t('contact.info.location'), href: undefined },
              ].map(({ Icon, c, bg, label, val, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, border: `1px solid ${c}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={c} aria-hidden />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', marginBottom: 4 }}>{label}</p>
                    {href
                      ? <a href={href} style={{ fontSize: 14, fontWeight: 500, color: '#f1f5f9', textDecoration: 'none', transition: 'color .2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = c)}
                        onMouseLeave={e => (e.currentTarget.style.color = '#f1f5f9')}>{val}</a>
                      : <p style={{ fontSize: 14, fontWeight: 500, color: '#f1f5f9' }}>{val}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid #1e1e32' }}>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>Respondemos en menos de 24 horas hábiles.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .1 }}
            className="lg:col-span-3" style={CARD}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '48px 0', textAlign: 'center' }}>
                <CheckCircle2 size={52} color="#10b981" />
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 600, color: '#f1f5f9' }}>{f.success_title as string}</h3>
                <p style={{ fontSize: 14, color: '#64748b' }}>{f.success_text as string}</p>
                <button onClick={() => setStatus('idle')}
                  style={{ marginTop: 8, fontSize: 13, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FInput label={f.name as string} req>
                    <input name="name" type="text" required placeholder={f.name_placeholder as string} style={IStyle} {...focus} />
                  </FInput>
                  <FInput label={f.email as string} req>
                    <input name="email" type="email" required placeholder={f.email_placeholder as string} style={IStyle} {...focus} />
                  </FInput>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FInput label={f.company as string}>
                    <input name="company" type="text" placeholder={f.company_placeholder as string} style={IStyle} {...focus} />
                  </FInput>
                  <FInput label={f.service as string}>
                    <select name="service" defaultValue="" style={{ ...IStyle, cursor: 'pointer', appearance: 'auto' }} {...focus}>
                      <option value="" disabled style={{ color: '#64748b', background: '#0a0a16' }}>{f.service_placeholder as string}</option>
                      {services.map(s => <option key={s} value={s} style={{ background: '#0a0a16' }}>{s}</option>)}
                    </select>
                  </FInput>
                </div>
                <FInput label={f.message as string} req>
                  <textarea name="message" required rows={5} placeholder={f.message_placeholder as string}
                    style={{ ...IStyle, resize: 'none' }} {...focus} />
                </FInput>

                {status === 'error' && (
                  <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#f87171' }}>
                    <AlertCircle size={15} aria-hidden /> {f.error as string}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#fff',
                    background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', border: 'none', cursor: 'pointer',
                    opacity: status === 'loading' ? .6 : 1, transition: 'opacity .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  {status === 'loading'
                    ? <><Loader2 size={15} className="animate-spin" />{f.submitting as string}</>
                    : <><Send size={15} />{f.submit as string}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
