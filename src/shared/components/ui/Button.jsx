import * as React from 'react';

const sizes = {
  default: 'h-10 px-5 py-2 text-sm',
  sm:      'h-8 px-3 text-xs',
  lg:      'h-12 px-8 text-base',
  icon:    'h-10 w-10',
};

/**
 * All colour logic lives in inline style so it always reflects the active CSS
 * variable regardless of whether Tailwind's purger kept a utility class.
 */
function variantStyle(variant) {
  switch (variant) {
    case 'teal':
      return { background: 'linear-gradient(135deg,#0EA5A0,#06B6D4)', color: '#fff' };
    case 'outline':
      return { backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--t1)', borderWidth: 2, borderStyle: 'solid' };
    case 'ghost':
      return { backgroundColor: 'transparent', color: 'var(--t1)' };
    case 'destructive':
      return { backgroundColor: '#EF4444', color: '#fff' };
    case 'white':
      return { backgroundColor: '#fff', color: 'var(--coral)', fontWeight: 700 };
    default: // 'default'
      return { background: 'linear-gradient(135deg,#FF6B6B,#FF8E53,#F59E0B)', color: '#fff' };
  }
}

const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', size = 'default', disabled, children, style: extraStyle = {}, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      style={{ ...variantStyle(variant), ...extraStyle }}
      className={[
        'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold',
        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 shadow-sm',
        'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        'hover:opacity-90 hover:shadow-md',
        sizes[size] ?? sizes.default,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export { Button };
