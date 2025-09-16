import React from 'react';

const SkeletonItem = ({ w, h, circle }) => {
  const width = w ? w : 100;
  const height = h ? h : 100;

  return (
    <div
      className='animate-pulse bg-[color:var(--skeletonColor)]'
      style={{ width, height, borderRadius: circle ? '50px' : '10px' }}
    ></div>
  );
};

export default SkeletonItem;
