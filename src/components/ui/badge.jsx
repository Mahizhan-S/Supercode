import React from 'react';

export function Badge({ className = '', variant = 'default', ...props }) {
  const variants = {
    default: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
    secondary: 'bg-slate-700/40 text-slate-300 border border-slate-600/30',
    outline: 'border border-slate-600 text-slate-300',
    easy: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    hard: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
    solved: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    attempted: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    todo: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
    revisit: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
}
