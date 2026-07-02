const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ className = '', children, ...props }) => (
  <div
    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    className={`rounded-3xl border shadow-2xl p-7 w-full max-w-sm mx-auto ${className}`}
    onClick={(e) => e.stopPropagation()}
    {...props}
  >
    {children}
  </div>
);

export { Dialog, DialogContent };
