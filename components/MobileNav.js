import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiHome2Line, RiHome2Fill } from 'react-icons/ri';

import {
	MdMovie,
	MdPerson,
	MdBookmark,
	MdOutlineMovie,
	MdVideoLibrary,
	MdOutlinePerson,
	MdBookmarkBorder,
	MdOutlineVideoLibrary,
} from 'react-icons/md';

/**
 * icon1 = button icon when not selected
 * icon2 = button icon when selected
 */
const buttons = {
	profile: { href: '/profile',icon1: <MdOutlinePerson />, icon2: <MdPerson /> },
	movies: { href: '/movies', icon1: <MdOutlineMovie />, icon2: <MdMovie /> },
	home: { href: '/', icon1: <RiHome2Line />, icon2: <RiHome2Fill /> },
	shows: { href: '/shows', icon1: <MdOutlineVideoLibrary />, icon2: <MdVideoLibrary /> },
	mylist: { href: '/mylist', icon1: <MdBookmarkBorder />, icon2: <MdBookmark /> },
}; 

export const MobileNav = () => {
	const { pathname } = useRouter();

	const Button = ({ href, icon1, icon2 }) => (
		<Link href={href} >
			<a className='h-full aspect-square highlights-none'>
				{React.cloneElement(href == pathname ? icon2 : icon1, {
					className: 'h-full w-full p-4 text-mobileNavButton',
				})}
			</a>
		</Link>
	);

	return (
		<div className='lg:hidden h-14 fixed w-full bottom-0 border-t border-borderPrimary bg z-50 bg-almostBlack bg-opacity-80 backdrop-filter backdrop-blur'>
			<div className='flex h-full justify-around'>
				{Object.values(buttons).map(({ href, icon1, icon2 }) => (
					<Button href={href} icon1={icon1} icon2={icon2} />
				))}
			</div>
		</div>
	);
};
