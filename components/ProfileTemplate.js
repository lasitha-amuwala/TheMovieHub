import React from 'react';
import NextImage from './NextImage';
import PageMargin from './PageMargin';

const ProfileTemplate = ({ backdropSrc, backdropAlt, imageSrc, imageAlt, children }) => {
  return (
    <div className='relative h-full w-full'>
      {backdropSrc && (
        <NextImage
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          src={backdropSrc}
          alt={backdropAlt}
          placeholder='blur'
          blurDataURL={backdropSrc}
          priority
          unoptimized
        />
      )}
      <div className='h-full w-full bg-black bg-opacity-50 backdrop-blur-3xl'>
        <PageMargin padding className='py-10 lg:py-12'>
          <div className='flex h-full w-full flex-col gap-10 overflow-hidden sm:flex-row sm:items-center lg:gap-12'>
            <div className='relative h-full px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:px-0'>
              <NextImage
                width={2}
                height={3}
                layout='responsive'
                className='rounded-lg'
                src={imageSrc}
                placeholder='blur'
                blurDataURL={imageSrc}
                alt={imageAlt}
                quality={100}
                unoptimized
              ></NextImage>
            </div>
            <div className='grow'>{children}</div>
          </div>
        </PageMargin>
      </div>
    </div>
  );
};

export default ProfileTemplate;
