import React from 'react';

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`flex min-h-[100px] w-full rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors duration-200 hover:border-slate-600 focus:border-violet-500/50 focus:bg-slate-800/80 focus:outline-none resize-none ${className}`}
      {...props}
    />
  );
}
