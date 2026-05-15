import React from 'react';

export function Button({ className = '', variant = 'default', size = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    default: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30',
    outline: 'bg-transparent border border-slate-700 hover:bg-slate-800/60 hover:border-slate-600 text-slate-200',
    ghost: 'bg-transparent border-0 hover:bg-slate-800/60 text-slate-300 hover:text-white',
    destructive: 'bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600/30 hover:border-rose-500/50',
    success: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-500/50',
  };
  const sizes = {
    default: 'h-10 px-5 py-2',
    sm: 'h-8 px-3 py-1.5 text-xs',
    lg: 'h-12 px-6 py-3',
    icon: 'h-10 w-10',
    'icon-sm': 'h-8 w-8',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    />
  );
}
