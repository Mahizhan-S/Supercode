import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full h-10 rounded-lg border border-[#3c494c]/40 bg-[#0e0e14] px-3 text-sm text-[#e4e1eb] placeholder:text-[#859397]/50 focus:border-[#2fd9f4]/60 focus:shadow-[0_0_12px_rgba(47,217,244,0.08)] transition-all duration-200 font-['Geist'] ${className}`}
      {...props}
    />
  );
}
