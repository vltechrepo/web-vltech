import { useState, useRef, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  color: '#0f172a',
  border: '1.5px solid #e2e8f0',
  borderRadius: 8,
  padding: '10px 13px',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color .18s, box-shadow .18s',
  display: 'block',
}

function Field({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', letterSpacing: '.02em' }}>
        {label}{req && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function useFocus() {
  return {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = '#7c3aed'
      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,.1)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.target.style.borderColor = '#e2e8f0'
      e.target.style.boxShadow = 'none'
    },
  }
}

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const focus = useFocus()
  const f = t('contact.form', { returnObjects: true }) as Record<string, string | string[]>
  const services = f.services as string[]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST', body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); formRef.current?.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section
      id="contacto"
      style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
    >
      <div style={{ maxWidth: 1024, margin: '0 auto', padding: '80px 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: .45 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span className="eyebrow">{t('contact.badge')}</span>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>
            {t('contact.title')}{' '}
            <span className="gradient-text">{t('contact.title_accent')}</span>
          </h2>
          <p className="section-copy" style={{ maxWidth: 480, margin: '0 auto' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Layout: info + form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: 20,
        }}>

          {/* Panel de info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45 }}
            className="section-card"
            style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, color: '#0f172a', margin: '0 0 8px' }}>
                Escríbenos
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#64748b', margin: 0 }}>
                {t('contact.subtitle')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { Icon: Mail,   c: '#7c3aed', bg: 'rgba(124,58,237,.08)', b: 'rgba(124,58,237,.2)', lbl: t('contact.info.email_label'),    val: t('contact.info.email'),    href: `mailto:${t('contact.info.email')}` },
                { Icon: MapPin, c: '#0ea5e9', bg: 'rgba(14,165,233,.08)',  b: 'rgba(14,165,233,.2)',  lbl: t('contact.info.location_label'), val: t('contact.info.location'), href: undefined },
              ].map(({ Icon, c, bg, b, lbl, val, href }) => (
                <div key={lbl} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, border: `1px solid ${b}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} color={c} aria-hidden />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 4px' }}>{lbl}</p>
                    {href
                      ? <a href={href} style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', textDecoration: 'none', transition: 'color .15s', overflowWrap: 'anywhere' }}
                          onMouseEnter={e => (e.currentTarget.style.color = c)}
                          onMouseLeave={e => (e.currentTarget.style.color = '#0f172a')}>{val}</a>
                      : <p style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', margin: 0 }}>{val}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                Respondemos en menos de 24 horas hábiles.
              </p>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .45, delay: .08 }}
            className="section-card"
            style={{ padding: '28px 24px' }}
          >
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '48px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="#10b981" />
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: '#0f172a', margin: 0 }}>{f.success_title as string}</h3>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>{f.success_text as string}</p>
                <button onClick={() => setStatus('idle')} style={{ marginTop: 8, fontSize: 13, color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label={f.name as string} req>
                    <input name="name" type="text" required placeholder={f.name_placeholder as string} style={INPUT} {...focus} />
                  </Field>
                  <Field label={f.email as string} req>
                    <input name="email" type="email" required placeholder={f.email_placeholder as string} style={INPUT} {...focus} />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label={f.company as string}>
                    <input name="company" type="text" placeholder={f.company_placeholder as string} style={INPUT} {...focus} />
                  </Field>
                  <Field label={f.service as string}>
                    <select name="service" defaultValue="" style={{ ...INPUT, cursor: 'pointer' }} {...focus}
                      onChange={e => (e.target.style.color = '#0f172a')}>
                      <option value="" disabled style={{ color: '#94a3b8' }}>{f.service_placeholder as string}</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label={f.message as string} req>
                  <textarea name="message" required rows={4} placeholder={f.message_placeholder as string}
                    style={{ ...INPUT, resize: 'none' }} {...focus} />
                </Field>

                {status === 'error' && (
                  <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#dc2626', background: '#fef2f2', padding: '10px 12px', borderRadius: 8, border: '1px solid #fecaca' }}>
                    <AlertCircle size={14} aria-hidden /> {f.error as string}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    height: 46, padding: '0 24px', borderRadius: 9,
                    fontSize: 14, fontWeight: 600, color: '#fff',
                    background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                    border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? .6 : 1,
                    transition: 'opacity .18s, box-shadow .18s',
                    marginTop: 4,
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 4px 18px rgba(124,58,237,.38)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  {status === 'loading'
                    ? <><Loader2 size={14} className="animate-spin" />{f.submitting as string}</>
                    : <><Send size={14} />{f.submit as string}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Responsivo: en móvil apilar columnas */}
        <style>{`
          @media (max-width: 767px) {
            #contacto [style*="grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr)"] {
              grid-template-columns: 1fr !important;
            }
            #contacto form [style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
