import * as React from 'react';

const PopoverContext = React.createContext(null);

const Popover = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children }) => {
  const { setOpen } = React.useContext(PopoverContext);
  return (
    <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
      {children}
    </div>
  );
};

const PopoverContent = ({ className = '', children, ...props }) => {
  const { open, setOpen } = React.useContext(PopoverContext);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, setOpen]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
      className={`absolute right-0 mt-2 z-50 min-w-[10rem] rounded-2xl border shadow-xl p-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
