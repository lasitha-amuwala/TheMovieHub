import React from 'react';

const IconButton = ({ children }) => {
  return (
    <div className='rounded-full bg-white bg-opacity-0 p-3 transition-all duration-200 hover:bg-opacity-5'>
      {children}
    </div>
  );
};

export default IconButton;
