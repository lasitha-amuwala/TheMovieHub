import { RiFilmLine, RiFilmFill, RiSearchLine, RiSearchFill } from 'react-icons/ri';
import { BsTv, BsTvFill, BsHouse, BsHouseFill, BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { MobileNavLink } from '@/components/MobileNavLink';

/**
 * icon1 = button icon when not selected
 * icon2 = button icon when selected
 */

const buttons = [
  { href: '/', icon1: <BsHouse />, icon2: <BsHouseFill /> },
  { href: '/Movies', icon1: <RiFilmLine />, icon2: <RiFilmFill /> },
  { href: '/search', icon1: <RiSearchLine />, icon2: <RiSearchFill /> },
  { href: '/Series', icon1: <BsTv />, icon2: <BsTvFill /> },
  { href: '/MyList', icon1: <BsBookmarks />, icon2: <BsBookmarksFill /> },
];

const styles = {
  link: `highlights-none aspect-square h-full`,
  container: `fixed bottom-0 z-50 h-12 w-full border-t border-borderPrimary bg-black/50 bg-opacity-80 backdrop-blur-lg sm:hidden`,
  button: `flex h-full justify-around`,
  icon: `h-full w-full p-3 active:scale-[1.3] transition-transform duration-500 text-mobileNavButton`,
};

export const MobileNav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        {buttons.map((button, key) => (
          <MobileNavLink data={button} key={key} />
        ))}
      </div>
    </div>
  );
};
