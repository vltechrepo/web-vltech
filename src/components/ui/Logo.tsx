export default function Logo({ height = 32 }: { height?: number }) {
  const w = height * 4.2
  return (
    <svg width={w} height={height} viewBox="0 0 168 40" fill="none" aria-label="VLTECH">
      <defs>
        <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* V mark */}
      <polyline points="2,8 18,34 34,8" stroke="url(#lg)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="34" r="2.5" fill="url(#lg)" />
      {/* Wordmark */}
      <text x="44" y="27" fontFamily="Space Grotesk, system-ui, sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.3" fill="#f1f5f9">
        VL<tspan fill="url(#lg)">TECH</tspan>
      </text>
    </svg>
  )
}
