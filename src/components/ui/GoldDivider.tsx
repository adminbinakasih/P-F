interface GoldDividerProps {
  className?: string
  symbol?: string
}

export default function GoldDivider({ className = '', symbol = '✦' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#CCC6B1]/40" />
      <span
        className="text-[#CCC6B1]/60 text-sm"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        {symbol}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#CCC6B1]/40" />
    </div>
  )
}
