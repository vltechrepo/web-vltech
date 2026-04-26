export default function Logo({ height = 32, dark = false }: { height?: number; dark?: boolean }) {
  const w = height * 4.2
  const textColor = dark ? '#f1f5f9' : '#0f172a'
  return (
    <svg width={w} height={height} viewBox="0 0 168 40" fill="none" aria-label="VLTECH">
      <defs>
        <linearGradient id="vlg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <polyline points="2,8 18,34 34,8" stroke="url(#vlg)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="34" r="2.5" fill="url(#vlg)" />
      <text x="44" y="27" fontFamily="Space Grotesk, system-ui, sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.3" fill={textColor}>
        VL<tspan fill="url(#vlg)">TECH</tspan>
      </text>
    </svg>
  )
}
