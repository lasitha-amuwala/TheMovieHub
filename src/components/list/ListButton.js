import React from 'react';

const ListButton = ({ icon, onClick, className }) => (
  <div
    className={`${className} absolute z-[1] hidden h-full w-[5%] cursor-pointer select-none bg-black bg-opacity-60 hover:bg-opacity-80 sm:block sm:w-[calc(5%-6px)] md:w-[calc(5%-8px)] lg:w-[calc(5%-10px)]`}
  >
    {React.cloneElement(icon, {
      onClick,
      className: 'h-full w-full opacity-0 duration-200 hover:scale-125 group-hover:opacity-100',
    })}
  </div>
);

export default ListButton;
