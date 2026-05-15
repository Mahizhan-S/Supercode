import React from 'react';

export function Progress({ value = 0, className = '', color = 'violet' }) {
  const colors = {
    violet: 'from-violet-500 to-indigo-500',
    emerald: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500',
    rose: 'from-rose-500 to-pink-500',
    cyan: 'from-cyan-500 to-blue-500',
  };

  return (
    <div className={`w-full h-2 bg-slate-800/80 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${colors[color] || colors.violet} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
