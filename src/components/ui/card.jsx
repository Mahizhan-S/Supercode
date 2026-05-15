import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div className={`glass-card p-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return <div className={`px-5 pt-5 pb-0 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }) {
  return <h3 className={`text-sm font-semibold text-[#e4e1eb] tracking-tight ${className}`}>{children}</h3>;
}

export function CardContent({ className = '', children }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}
