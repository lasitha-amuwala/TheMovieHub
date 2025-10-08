import { useEffect, useState } from 'react';

type BreakpointKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type Breakpoint = Partial<Record<BreakpointKey, number>>;

export const useBreakpoints = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>({});

  const breakpoints: Record<Exclude<BreakpointKey, 'none'>, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 2100,
  };

  const findBreakpoint = () => {
    const width = window.innerWidth;
    if (width < breakpoints.sm) setBreakpoint({ none: 0 });
    else if (width < breakpoints.md) setBreakpoint({ sm: breakpoints.sm });
    else if (width < breakpoints.lg) setBreakpoint({ md: breakpoints.md });
    else if (width < breakpoints.xl) setBreakpoint({ lg: breakpoints.lg });
    else if (width < breakpoints['2xl']) setBreakpoint({ xl: breakpoints.xl });
    else if (width < breakpoints['3xl']) setBreakpoint({ '2xl': breakpoints['2xl'] });
    else setBreakpoint({ '3xl': breakpoints['3xl'] });
  };

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(findBreakpoint, 100);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // run once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
