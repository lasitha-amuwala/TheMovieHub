import Link from 'next/link';

type Props = {
  label: string;
  to: string;
};

export const NavLink = ({ label, to }: Props) => (
  <Link href={to} className='py-2 hover:text-gray-300'>
    {label}
  </Link>
);
