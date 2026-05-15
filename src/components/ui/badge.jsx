import React from 'react';

const variantStyles = {
  easy: "bg-[#68f5b8]/10 text-[#68f5b8] border border-[#68f5b8]/20",
  medium: "bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20",
  hard: "bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20",
  solved: "bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20",
  attempted: "bg-[#2fd9f4]/10 text-[#2fd9f4] border border-[#2fd9f4]/20",
  todo: "bg-[#3c494c]/30 text-[#bbc9cd] border border-[#3c494c]/30",
  revisit: "bg-[#d0bcff]/10 text-[#d0bcff] border border-[#d0bcff]/20",
  secondary: "bg-[#2a2930] text-[#bbc9cd] border border-[#3c494c]/20",
  default: "bg-[#2a2930] text-[#bbc9cd] border border-[#3c494c]/20",
};

export function Badge({ variant = 'default', className = '', children }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-['JetBrains_Mono'] tracking-wider uppercase whitespace-nowrap ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
}
