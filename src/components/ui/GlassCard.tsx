import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function GlassCard({ children, className = '', hoverable = false }: GlassCardProps) {
  return (
    <div
      style={hoverable ? { transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' } : undefined}
      onMouseEnter={hoverable ? (e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(124,58,237,0.5)'
        el.style.boxShadow = '0 0 30px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.3)'
        el.style.transform = 'translateY(-4px)'
      } : undefined}
      onMouseLeave={hoverable ? (e) => {
        const el = e.currentTarget
        el.style.borderColor = ''
        el.style.boxShadow = ''
        el.style.transform = ''
      } : undefined}
      className={['glass rounded-2xl', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
