import { ElementType, ReactNode, MouseEvent } from 'react';

interface RippleWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType; // allows us to use div, a, li, etc.
}

export default function RippleWrapper({
  children,
  className = '',
  as: Component = 'div',
  onClick,
  ...props
}: RippleWrapperProps) {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'absolute rounded-full bg-white/35 animate-ripple pointer-events-none';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e); // trigger any click handlers you pass
  };

  return (
    <Component
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {children}
    </Component>
  );
}
