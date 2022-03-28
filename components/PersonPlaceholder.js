import React from 'react';
import { MdPerson } from 'react-icons/md';

const PersonPlaceholder = () => {
  return (
    <div className='h-full w-full rounded-lg bg-[rgb(5,5,5)]'>
      <MdPerson className='h-full w-full fill-[rgb(35,35,35)]' />
    </div>
  );
};

export default PersonPlaceholder;
