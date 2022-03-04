import React from 'react';
import Link from 'next/link';
import { RiSearchLine } from 'react-icons/ri';

export const Navbar = () => {
  const NavItem = ({ label, to }) => (
    <Link href={to} className='px-4 py-2 hover:text-gray-300'>
      <a>{label}</a>
    </Link>
  );

  return (
    <div className='bg fixed top-0 z-50 h-14 w-full bg-almostBlack bg-opacity-80 backdrop-blur backdrop-filter lg:h-16'>
      <div className='mx-7% flex h-full items-center justify-between text-white md:mx-5%'>
        <div className='highlights-none flex items-center font-bold'>
          <NavItem to='/' label='MovieHub' />
          <div className='hidden items-center gap-16 pl-16 font-normal sm:flex '>
            <NavItem label='Movies' to='/' />
            <NavItem label='Series' to='/' />
            <NavItem label='Profile' to='/' />
            <NavItem label='My List' to='/' />
          </div>
        </div>
      </div>
    </div>
  );
};
