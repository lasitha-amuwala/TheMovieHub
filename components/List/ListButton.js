import React from 'react';

const ListButton = ({ icon, onClick, className }) => (
  <div
    className={`${className} absolute z-[1] hidden h-full w-[7%] cursor-pointer select-none bg-black bg-opacity-60 hover:bg-opacity-80 sm:block md:w-[calc(5.05%-6px)] 3xl:w-[calc(5.05%-0.75rem)]`}
  >
    {React.cloneElement(icon, {
      onClick,
      className:
        'h-full w-full transform opacity-0 transition-transform duration-200 hover:scale-125 group-hover:opacity-100',
    })}
  </div>
);

export default ListButton;
