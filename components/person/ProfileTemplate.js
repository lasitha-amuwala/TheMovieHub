import React from 'react';
import NextImage from '../NextImage';
import PageMargin from '../PageMargin';
import PersonPlaceholder from '../PersonPlaceholder';
import useApiConfiguration from '../../src/hooks/useApiConfig';

const ProfileTemplate = ({ backdropSrc, backdropAlt, imageSrc, imageAlt, children }) => {
  const { getImageUrl } = useApiConfiguration();
  return (
    <div className='relative h-full w-full'>
      {backdropSrc && (
        <NextImage
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          src={getImageUrl(backdropSrc, { original: true })}
          alt={backdropAlt}
          priority
          unoptimized
        />
      )}
      <div
        className={`h-full w-full bg-backgroundShadow ${
          backdropSrc && 'bg-opacity-50'
        } backdrop-blur-3xl`}
      >
        <PageMargin padding className='py-10 lg:py-12'>
          <div className='flex h-full w-full flex-col gap-10 overflow-hidden sm:flex-row lg:gap-12'>
            <div className='relative h-full sm:self-center border-backgroundShadow px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:px-0'>
              {imageSrc ? (
                <NextImage
                  width={200}
                  height={300}
                  layout='responsive'
                  className='rounded-lg'
                  src={getImageUrl(imageSrc, { original: true })}
                  alt={imageAlt}
                  quality={100}
                  unoptimized
                ></NextImage>
              ) : (
                <PersonPlaceholder />
              )}
            </div>
            <div className='grow self-start'>{children}</div>
          </div>
        </PageMargin>
      </div>
    </div>
  );
};

export default ProfileTemplate;
