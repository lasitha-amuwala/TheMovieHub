'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type MobileNavLink = {
  href: string;
  icon1: React.JSX.Element;
  icon2: React.JSX.Element;
};

type Props = { data: MobileNavLink };

const styles = {
  link: `highlights-none aspect-square h-full`,
  container: `fixed bottom-0 z-50 h-12 w-full border-t border-borderPrimary bg-black/50 bg-opacity-80 backdrop-blur-lg sm:hidden`,
  button: `flex h-full justify-around`,
  icon: `h-full w-full p-3 active:scale-[1.3] transition-transform duration-500 text-mobileNavButton`,
};

export const MobileNavLink = ({ data }: Props) => {
  const pathname = usePathname();
  const { href, icon1, icon2 } = data;
  return (
    <Link href={data.href} className={styles.link}>
      {React.cloneElement(href == pathname ? icon2 : icon1, {
        className: styles.icon,
      })}
    </Link>
  );
};
