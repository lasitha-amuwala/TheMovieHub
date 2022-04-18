import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const NavItem = ({ label, to }) => (
  <Link href={to} className='px-4 py-2 hover:text-gray-300'>
    <a>{label}</a>
  </Link>
);

export const Navbar = () => {
  const [show, setShow] = useState(false);

  const onScroll = () => setShow(scrollY > 50);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-[2] h-14 w-full bg-almostBlack/75 backdrop-blur transition-all duration-700 sm:bg-transparent sm:backdrop-blur-none lg:h-16',
        { 'backdrop-blur sm:bg-almostBlack/75': show }
      )}
    >
      <div className='mx-7% flex h-full items-center justify-between md:mx-5%'>
        <div className='highlights-none flex items-center font-bold'>
          <NavItem to='/' label='MovieHub' />
          <div className='hidden items-center gap-16 pl-16 font-normal sm:flex '>
            <NavItem label='Movies' to='/Movies' />
            <NavItem label='Series' to='/Series' />
            <NavItem label='Profile' to='/Profile' />
            <NavItem label='My List' to='/MyList' />
          </div>
        </div>
      </div>
    </div>
  );
};
