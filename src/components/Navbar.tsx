'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { NavLink } from '@/components/NavLink';

export const Navbar = () => {
  const [show, setShow] = useState(false);

  const onScroll = () => setShow(scrollY > 56);

  useEffect(() => {
    addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = `fixed top-0 left-0 z-[2] h-12 sm:h-14 w-full lg:h-16 px-6`;

  return (
    <nav
      className={classNames(navStyle, {
        'bg-black/50 backdrop-blur-lg duration-500 ': show,
        'bg-gradient-to-b from-black/50 to-transparent duration-500 ': !show,
      })}
    >
      <div className='mx-[4%] flex h-full items-center justify-between '>
        <div className='highlights-none flex items-center font-bold'>
          <NavLink to='/' label='TheMovieHub' />
          <div className='hidden items-center gap-16 pl-16 font-normal sm:flex '>
            {/* <NavLink label='Movies' to='/Movies' />
            <NavLink label='Series' to='/Series' />
            <NavLink label='Profile' to='/Profile' />
            <NavLink label='My List' to='/MyList' /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
