import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFilmLine, RiFilmFill, RiSearchLine, RiSearchFill } from 'react-icons/ri';
import { BsTv, BsTvFill, BsHouse, BsHouseFill, BsBookmarks, BsBookmarksFill } from 'react-icons/bs';

/**
 * icon1 = button icon when not selected
 * icon2 = button icon when selected
 */
const buttons = {
  home: { href: '/', icon1: <BsHouse />, icon2: <BsHouseFill /> },
  movies: { href: '/Movies', icon1: <RiFilmLine />, icon2: <RiFilmFill /> },
  search: { href: '/search', icon1: <RiSearchLine />, icon2: <RiSearchFill /> },
  shows: { href: '/Series', icon1: <BsTv />, icon2: <BsTvFill /> },
  list: { href: '/MyList', icon1: <BsBookmarks />, icon2: <BsBookmarksFill /> },
};

const styles = {
  link: `highlights-none aspect-square h-full`,
  container: `fixed bottom-0 z-50 h-12 w-full border-t border-borderPrimary bg-black/50 bg-opacity-80 backdrop-blur-lg sm:hidden`,
  button: `flex h-full justify-around`,
  icon: `h-full w-full p-3 active:scale-[1.3] transition-transform duration-500 text-mobileNavButton`,
};

export const MobileNav = () => {
  const { pathname } = usePathname();

  const Button = ({ data }) => (
    <Link href={data.href} className={styles.link}>
      {React.cloneElement(data.href == pathname ? data.icon2 : data.icon1, {
        className: styles.icon,
      })}
    </Link>
  );

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        {Object.keys(buttons).map(key => (
          <Button data={buttons[key]} key={key} />
        ))}
      </div>
    </div>
  );
};
