import { useEffect, useState } from 'react';

export const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState({});
  const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536, '3xl': 2100 };

  const findBreakpoint = () => {
    const width = window.innerWidth;
    if (width < breakpoints.sm) setBreakpoint({ none: 0 });
    else if (width < breakpoints.md) setBreakpoint({ sm: breakpoints.sm });
    else if (width < breakpoints.lg) setBreakpoint({ md: breakpoints.md });
    else if (width < breakpoints.xl) setBreakpoint({ lg: breakpoints.lg });
    else if (width < breakpoints['2xl']) setBreakpoint({ md: breakpoints.xl });
    else if (width < breakpoints['3xl']) setBreakpoint({ ['2xl']: breakpoints['2xl'] });
    else setBreakpoint({ ['3xl']: breakpoints['3xl'] });
  };

  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      findBreakpoint();
    }, 100);
  };

  useEffect(() => {
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  });

  useEffect(() => handleResize(), []);
  return breakpoint;
};
