import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Dialog = ({ open, onOpenChange, children }) => {
  const overlayRef = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content wrapper — above backdrop */}
      <div className="relative w-full" style={{ zIndex: 10000 }}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

const DialogContent = ({ className = '', children, ...props }) => (
  <div
    className={`rounded-3xl border shadow-2xl p-7 w-full max-w-sm mx-auto ${className}`}
    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    onClick={(e) => e.stopPropagation()}
    {...props}
  >
    {children}
  </div>
);

export { Dialog, DialogContent };
