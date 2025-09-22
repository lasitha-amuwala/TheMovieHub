'use client';
import Link from 'next/link';
import useApiConfiguration from '@/hooks/useApiConfig';
import NextImage from '@/components/NextImage';
import { ImageCard } from '@/components/person/ImageCard';
import { usePathname } from 'next/navigation';

const PersonImageCard = ({ path, personId, disableLink = true }) => {
  const { getImageUrl } = useApiConfiguration();
  const pathname = usePathname();
  return (
    <div className='mx-2 flex h-full flex-col overflow-hidden rounded drop-shadow-md duration-300'>
      <Link href={disableLink ? '' : { pathname, query: { i: path.substring(1) } }} scroll={false} replace>
        <ImageCard>
          <NextImage
            src={getImageUrl(path)}
            fill
            alt={`${personId} image`}
            className='object-cover'
            placeholder='data:image/png../../public/placeholder.png'
            unoptimized
          />
        </ImageCard>
      </Link>
    </div>
  );
};
export default PersonImageCard;
