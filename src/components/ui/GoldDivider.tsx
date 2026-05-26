interface GoldDividerProps {
  className?: string
  symbol?: string
}

export default function GoldDivider({ className = '', symbol = '✦' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #5A4535)' }} />
      <span className="text-[#3D2E1E] text-base font-semibold" style={{ fontFamily: 'var(--font-cormorant)' }}>
        {symbol}
      </span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #5A4535)' }} />
    </div>
  )
}
