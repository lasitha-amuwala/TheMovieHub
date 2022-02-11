import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	RiFilmLine,
	RiFilmFill,
	RiSearchLine,
	RiSearchFill,
} from 'react-icons/ri';

import {
	BsTv,
	BsTvFill,
	BsHouse,
	BsHouseFill,
	BsBookmarks,
	BsBookmarksFill,
} from 'react-icons/bs';

/**
 * icon1 = button icon when not selected
 * icon2 = button icon when selected
 */
const buttons = {
	home: { href: '/', icon1: <BsHouse />, icon2: <BsHouseFill /> },
	movies: { href: '/movies', icon1: <RiFilmLine />, icon2: <RiFilmFill /> },
	search: { href: '/search', icon1: <RiSearchLine />, icon2: <RiSearchFill /> },
	shows: { href: '/shows', icon1: <BsTv />, icon2: <BsTvFill /> },
	list: { href: '/list', icon1: <BsBookmarks />, icon2: <BsBookmarksFill /> },
};

export const MobileNav = () => {
	const { pathname } = useRouter();

	const Button = ({ href, icon1, icon2 }) => (
		<Link href={href}>
			<a className='h-full aspect-square highlights-none'>
				{React.cloneElement(href == pathname ? icon2 : icon1, {
					className: 'h-full w-full p-4 text-mobileNavButton',
				})}
			</a>
		</Link>
	);

	return (
		<div className='lg:hidden h-14 fixed w-full bottom-0 border-t border-borderPrimary z-50 bg-almostBlack bg-opacity-80 backdrop-filter backdrop-blur'>
			<div className='flex h-full justify-around'>
				{Object.values(buttons).map(({ href, icon1, icon2 }) => (
					<Button href={href} icon1={icon1} icon2={icon2} />
				))}
			</div>
		</div>
	);
};
