import React from 'react';

interface BarcodePatternProps {
  text: string;
  className?: string;
}

// Generate consistent heights based on seed (text)
const generateHeights = (seed: string, count: number): number[] => {
  const heights: number[] = [];
  let hash = 0;
  
  // Create hash from seed
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate heights using seeded random
  for (let i = 0; i < count; i++) {
    // Simple LCG (Linear Congruential Generator)
    hash = (hash * 1664525 + 1013904223) & 0xffffffff;
    const normalized = Math.abs(hash) / 0xffffffff;
    heights.push(Math.floor(normalized * 60 + 40));
  }
  
  return heights;
};

export default function BarcodePattern({ text, className = '' }: BarcodePatternProps) {
  const heights = generateHeights(text, 30);
  
  return (
    <div className={className}>
      <div className="flex justify-center gap-[2px] h-16 items-end">
        {heights.map((height, i) => (
          <div
            key={i}
            className="w-1 bg-slate-800"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="text-center text-xs text-slate-500 mt-2 font-mono">
        {text}
      </p>
    </div>
  );
}

// Smaller barcode for mini versions
export function MiniBarcodePattern({ text, barCount = 20 }: { text?: string; barCount?: number }) {
  const heights = generateHeights(text || 'default', barCount);
  
  return (
    <div className="flex justify-center gap-[1px] h-10 items-end">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-slate-700"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
