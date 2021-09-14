import React from 'react';

//import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';
//    <FaMoon color="#A0AEC0" />,
//<FaSun color="#A0AEC0" />
export const Navbar = () => {
  return (
    <div
      className="h-16 w-screen fixed top-0 px-4 bg z-50"
      style={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0,0,0,.7) 1%,rgba(0,0,0,0))',
      }}
    >
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center text-white">
          <h6 className="font-bold">MovieHub</h6>
          <div className="flex pl-8 gap-4">
            <button className="px-4 py-2 hover:text-gray-300 font-normal">
              Movies
            </button>
            <button className="px-4 py-2 hover:text-gray-300 font-normal">
              Series
            </button>
            <button className="px-4 py-2 hover:text-gray-300 font-normal">
              Profile
            </button>
            <button className="px-4 py-2 hover:text-gray-300 font-normal">
              My List
            </button>
          </div>
        </div>
        <button className="text-gray-700 px-4"></button>
      </div>
    </div>
  );
};
