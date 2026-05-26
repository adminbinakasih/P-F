interface GoldDividerProps {
  className?: string
  symbol?: string
}

export default function GoldDivider({ className = '', symbol = '✦' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8A7560]" />
      <span className="text-[#8A7560] text-sm font-medium" style={{ fontFamily: 'var(--font-cormorant)' }}>
        {symbol}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8A7560]" />
    </div>
  )
}
