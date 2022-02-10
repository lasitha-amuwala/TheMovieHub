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

export const MobileNav = () => {
	const { pathname } = useRouter();
	const style = 'h-full w-full p-5 text-mobileNavButton';

	const Button = ({ href, icon1, icon2 }) => (
		<Link href={href}>
			<a className='h-16 aspect-square  '>{href == pathname ? icon2 : icon1}</a>
		</Link>
	);

	return (
		<div className=' lg:hidden h-16 fixed w-full bottom-0 border-t border-borderPrimary bg z-50 bg-almostBlack bg-opacity-80 backdrop-filter backdrop-blur'>
			<div className='flex h-16 justify-around'>
				<Button
					href='/profile'
					icon1={<MdOutlinePerson className={style} />}
					icon2={<MdPerson className={style} />}
				/>
				<Button
					href='/movies'
					icon1={<MdOutlineMovie className={style} />}
					icon2={<MdMovie className={style} />}
				/>
				<Button
					href='/'
					icon1={<RiHome2Line className={style} />}
					icon2={<RiHome2Fill className={style} />}
				/>
				<Button
					href='/shows'
					icon1={<MdOutlineVideoLibrary className={style} />}
					icon2={<MdVideoLibrary className={style} />}
				/>
				<Button
					href='/mylist'
					icon1={<MdBookmarkBorder className={style} />}
					icon2={<MdBookmark className={style} />}
				/>
			</div>
		</div>
	);
};
