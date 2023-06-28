import React from 'react';
import classNames from 'classnames';
import NextImage from './NextImage';
import PageMargin from './PageMargin';
import PersonPlaceholder from './PersonPlaceholder';
import useApiConfiguration from '../src/hooks/useApiConfig';
import useRouter from '../src/hooks/useRouter';
import Link from 'next/link';
import Blur from './Blur';

const ProfileTemplate = ({ backdropSrc, backdropAlt, imageSrc, imageAlt, children }) => {
  const { getImageUrl } = useApiConfiguration();
  const router = useRouter();
  console.log(router)
  return (
    <div className='relative h-full w-full'>
      {backdropSrc && (
        <Blur blurRadius={64}>
          <NextImage
            layout='fill'
            objectFit='cover'
            objectPosition='top'
            src={getImageUrl(backdropSrc, { original: true })}
            alt={backdropAlt}
            priority
            unoptimized
          />
        </Blur>
      )}
      <div
        className='h-full w-full bg-backgroundShadow'
      >
        <PageMargin padding className='py-1 pt-24 pb-6 sm:pb-12'>
          <div className=' flex h-full w-full flex-col gap-10 overflow-hidden sm:flex-row lg:gap-12'>
            <div className='relative z-[1] h-full border-backgroundShadow px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:self-center sm:px-0'>
              {imageSrc ? (
                <Link
                  href={{ pathname: router.asRoute, query: { i: imageSrc.substring(1) } }}
                  passHref
                  shallow
                >
                  <a>
                    <NextImage
                      width={200}
                      height={300}
                      layout='responsive'
                      className='rounded-lg'
                      src={getImageUrl(imageSrc, { original: true })}
                      alt={imageAlt}
                      quality={100}
                      unoptimized
                      priority={!backdropSrc}
                    />
                  </a>
                </Link>
              ) : (
                <PersonPlaceholder />
              )}
            </div>
            <div className='z-[1] grow self-start'>{children}</div>
          </div>
        </PageMargin>
      </div>
      <div className={classNames('absolute top-0 h-full w-full', {'bg-black/50': backdropSrc})}></div>
    </div>
  );
};

export default ProfileTemplate;
