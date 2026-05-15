import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const SelectContext = createContext();

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '' }) {
  const ctx = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={`flex h-10 w-full items-center justify-between rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-2 text-sm text-slate-100 transition-colors hover:border-slate-600 focus:border-violet-500/50 ${className}`}
    >
      {children}
      <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${ctx.open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder = 'Select...' }) {
  const ctx = useContext(SelectContext);
  return <span className={ctx.value ? 'text-slate-100' : 'text-slate-500'}>{ctx.value || placeholder}</span>;
}

export function SelectContent({ children }) {
  const ctx = useContext(SelectContext);
  if (!ctx.open) return null;
  return (
    <div className="absolute top-full left-0 right-0 mt-1 border border-slate-700/60 rounded-xl p-1.5 bg-slate-800/95 backdrop-blur-lg shadow-xl shadow-black/30 z-50 animate-slide-down max-h-64 overflow-y-auto">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }) {
  const ctx = useContext(SelectContext);
  const isActive = ctx.value === value;
  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer rounded-lg transition-colors ${isActive ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
      onClick={() => {
        ctx.onValueChange?.(value);
        ctx.setOpen(false);
      }}
    >
      {children}
    </div>
  );
}
