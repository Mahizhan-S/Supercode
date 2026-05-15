import React from 'react';

export function Card({ className = '', ...props }) {
  return <div className={`glass-card ${className}`} {...props} />;
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`p-6 ${className}`} {...props} />;
}

export function CardTitle({ className = '', ...props }) {
  return <h3 className={`font-semibold text-slate-100 ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={`px-6 pb-6 ${className}`} {...props} />;
}
