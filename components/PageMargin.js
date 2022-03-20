import React from 'react';

const PageMargin = ({ padding, className, children }) => (
  <div className='m-auto w-full max-w-[var(--maxPageWidth)]'>
    <div className={`${padding ? 'px-8 lg:px-12 2xl:px-20' : ''} ${className}`}>{children}</div>
  </div>
);

export default PageMargin;
