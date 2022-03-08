import React from 'react';

export const usePrevious = (value) => {
  const ref = React.useRef(null);
  React.useEffect(() => (ref.current = value), [value]);
  return ref.current;
};
