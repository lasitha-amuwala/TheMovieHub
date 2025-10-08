import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const PageMargin = ({ className = '', children }: Props) => (
  <div className={`m-auto max-w-[var(--maxPageWidth)] p-6 ${className}`}>{children}</div>
);
export default PageMargin;
