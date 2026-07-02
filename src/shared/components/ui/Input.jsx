import * as React from 'react';

const Input = React.forwardRef(function Input({ className = '', type, style: extraStyle = {}, ...props }, ref) {
  return (
    <input
      type={type}
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        color: 'var(--t1)',
        ...extraStyle,
      }}
      className={[
        'flex h-12 w-full rounded-2xl border-2 px-4 py-2 text-sm',
        'transition-all duration-200 outline-none',
        'placeholder:opacity-60',
        'focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ].join(' ')}
      onFocus={(e) => {
        e.target.style.borderColor = 'var(--coral)';
        e.target.style.boxShadow = '0 0 0 4px rgba(255,107,107,0.12)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'var(--border)';
        e.target.style.boxShadow = 'none';
        props.onBlur?.(e);
      }}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export { Input };
