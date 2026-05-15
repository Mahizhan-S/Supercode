import React from 'react';

const colorMap = {
  emerald: { bar: 'bg-[#68f5b8]', track: 'bg-[#68f5b8]/10' },
  amber: { bar: 'bg-[#fbbf24]', track: 'bg-[#fbbf24]/10' },
  rose: { bar: 'bg-[#ffb4ab]', track: 'bg-[#ffb4ab]/10' },
  violet: { bar: 'bg-[#d0bcff]', track: 'bg-[#d0bcff]/10' },
  cyan: { bar: 'bg-[#2fd9f4]', track: 'bg-[#2fd9f4]/10' },
};

export function Progress({ value = 0, color = 'cyan', className = '' }) {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div className={`w-full h-1.5 rounded-full overflow-hidden ${c.track} ${className}`}>
      <div
        className={`h-full rounded-full ${c.bar} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
