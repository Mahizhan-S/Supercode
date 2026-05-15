import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className = '' }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = onValueChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1 p-1 rounded-xl bg-slate-800/50 border border-slate-700/40 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '' }) {
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
      } ${className}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }) {
  const ctx = useContext(TabsContext);
  return ctx.value === value ? <div className={`animate-fade-in ${className}`}>{children}</div> : null;
}
