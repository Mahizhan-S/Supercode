import React from 'react';

export function Checkbox({ checked, onCheckedChange, className = '' }) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer h-5 w-5 rounded-md border-2 border-slate-600 bg-slate-800/50 appearance-none cursor-pointer transition-all duration-200 checked:bg-violet-600 checked:border-violet-600 hover:border-slate-500"
      />
      <svg className="absolute left-0.5 top-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
