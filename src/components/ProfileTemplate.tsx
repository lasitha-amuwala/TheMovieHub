'use client';
import Image from './Image';
import PageMargin from './PageMargin';
import PersonPlaceholder from './PersonPlaceholder';
import useApiConfiguration from '@/hooks/useApiConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { imageSrc: string; imageAlt: string; children: React.ReactNode };

const ProfileTemplate = ({ imageSrc, imageAlt, children }: Props) => {
  const { getImageUrl } = useApiConfiguration();

  const pathname = usePathname();

  return (
    <PageMargin className='py-1 pt-24 pb-6 sm:pb-12'>
      <div className='flex h-full w-full flex-col gap-10 overflow-hidden sm:flex-row lg:gap-12'>
        <div className='relative h-full border-backgroundShadow px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:self-center sm:px-0'>
          {imageSrc ? (
            <Link href={{ pathname, query: { i: imageSrc.substring(1) } }} passHref shallow>
              <Image
                fill
                className='rounded-lg'
                src={getImageUrl(imageSrc, { original: true })}
                alt={imageAlt}
                quality={100}
                unoptimized
              />
            </Link>
          ) : (
            <PersonPlaceholder />
          )}
        </div>
        {children}
      </div>
    </PageMargin>
  );
};

export default ProfileTemplate;
