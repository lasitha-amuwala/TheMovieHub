import React from 'react';

const PageMargin = ({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`m-auto max-w-[var(--maxPageWidth)] p-6 ${className}`}>{children}</div>;
export default PageMargin;
