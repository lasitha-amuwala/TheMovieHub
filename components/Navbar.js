import React from 'react';
import Link from 'next/link';

export const Navbar = () => {

	const NavItem = ({ label, to }) => (
		<Link href={to} className='px-4 py-2 hover:text-gray-300'>
			<a>{label}</a>
		</Link>
	);

	return (
		<div className='h-16 fixed w-full top-0 bg z-50 bg-almostBlack bg-opacity-80 backdrop-filter backdrop-blur'>
			<div className='flex h-full items-center justify-between mx-7% md:mx-5%'>
				<div className='flex items-center text-white font-bold'>
					<NavItem to='/' label='MovieHub'/>
					<div className='flex items-center pl-16 gap-16 font-normal'>
						<NavItem label='Movies' to='/' />
						<NavItem label='Series' to='/' />
						<NavItem label='Profile' to='/' />
						<NavItem label='My List' to='/' />
					</div>
				</div>
			</div>
		</div>
	)
};
