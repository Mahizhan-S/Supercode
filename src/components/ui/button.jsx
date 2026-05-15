import React from 'react';

const base = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]";

const variants = {
  default: "bg-[#22d3ee] text-[#005763] hover:bg-[#2fd9f4] shadow-[0_0_20px_rgba(34,211,238,0.15)] rounded-lg font-semibold",
  outline: "border border-[#3c494c]/40 bg-transparent text-[#bbc9cd] hover:border-[#2fd9f4]/40 hover:text-[#2fd9f4] hover:bg-[#2fd9f4]/5 rounded-lg",
  ghost: "bg-transparent text-[#bbc9cd] hover:text-[#e4e1eb] hover:bg-[#2a2930] rounded-lg",
  destructive: "bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/20 hover:bg-[#93000a]/30 rounded-lg",
  success: "bg-[#68f5b8]/10 text-[#68f5b8] border border-[#68f5b8]/20 hover:bg-[#68f5b8]/15 rounded-lg",
  secondary: "bg-[#571bc1]/20 text-[#d0bcff] border border-[#571bc1]/30 hover:bg-[#571bc1]/30 rounded-lg",
};

const sizes = {
  default: "h-9 px-4 text-sm gap-1.5",
  sm: "h-7 px-3 text-xs gap-1",
  lg: "h-11 px-6 text-sm gap-2",
  icon: "h-9 w-9 p-0",
};

export function Button({ variant = 'default', size = 'default', className = '', children, ...props }) {
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  );
}
