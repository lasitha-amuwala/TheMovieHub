import React from 'react';

const PageMargin = ({ padding, className, children }) => (
  <div className='m-auto h-full w-full max-w-[var(--maxPageWidth)]'>
    <div className={`${padding ? 'h-full w-full px-6' : ''} ${className}`}>
      {children}
    </div>
  </div>
);

export default PageMargin;
