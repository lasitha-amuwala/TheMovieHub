import NextImage from '../NextImage';
import Link from 'next/link';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import { usePathname } from 'next/navigation';

const PersonImageCard = ({ path, name, disableLink = true }) => {
  const pathname = usePathname();
  const { getImageUrl } = useApiConfiguration();

  const ImageCard = () => (
    <div className='relative aspect-[2/3]'>
      <NextImage
        src={getImageUrl(path)}
        fill
        alt={name}
        className='object-cover'
        placeholder='data:image/png../../public/placeholder.png'
        unoptimized
      />
      <div className='absolute top-0 h-full w-full opacity-10 transition-colors duration-200 hover:bg-white'></div>
    </div>
  );

  return (
    <div className='mx-2 flex h-full flex-col overflow-hidden rounded drop-shadow-md duration-300'>
      {disableLink ? (
        <ImageCard />
      ) : (
        <Link href={{ pathname, query: { i: path.substring(1) } }} shallow>
          <ImageCard />
        </Link>
      )}
    </div>
  );
};
export default PersonImageCard;
