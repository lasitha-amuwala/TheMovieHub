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

  const onScroll = () => setShow(scrollY > 56);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = `fixed top-0 left-0 z-[2] h-12 sm:h-14 w-full lg:h-16`;

  return (
    <nav
      className={classNames(navStyle, {
        'bg-black/50 backdrop-blur-lg duration-700 ': show,
        'bg-gradient-to-b from-black/50 to-transparent duration-700 ': !show,
      })}
    >
      <div className='mx-7% flex h-full items-center justify-between md:mx-5%'>
        <div className='highlights-none flex items-center font-bold'>
          <NavItem to='/' label='TheMovieHub' />
          <div className='hidden items-center gap-16 pl-16 font-normal sm:flex '>
            <NavItem label='Movies' to='/Movies' />
            <NavItem label='Series' to='/Series' />
            <NavItem label='Profile' to='/Profile' />
            <NavItem label='My List' to='/MyList' />
          </div>
        </div>
      </div>
    </nav>
  );
};
