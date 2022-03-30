import React from 'react';
import classNames from 'classnames';
import NextImage from './NextImage';
import PageMargin from './PageMargin';
import PersonPlaceholder from './PersonPlaceholder';
import useApiConfiguration from '../src/hooks/useApiConfig';

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
        className={classNames('h-full w-full bg-backgroundShadow backdrop-blur-3xl', {
          'bg-opacity-50': backdropSrc,
        })}
      >
        <PageMargin padding className='py-10 lg:py-12'>
          <div className='flex h-full w-full flex-col gap-10 overflow-hidden sm:flex-row lg:gap-12'>
            <div className='relative h-full border-backgroundShadow px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:self-center sm:px-0'>
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
                  priority={!backdropSrc}
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

/**const ProfileTemplate = ({ backdropSrc, backdropAlt, imageSrc, imageAlt, children }) => {
  const { getImageUrl } = useApiConfiguration();
  return (
    <div className='relative h-full w-full'>
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
      </div>

      <div
        className={`top-0 h-full w-full bg-backgroundShadow absolute ${
          backdropSrc && 'bg-opacity-50'
        } backdrop-blur-3xl`}
      >
        <PageMargin padding className='py-10 lg:py-12'>
          <div className='flex h-full w-full flex-col gap-10 overflow-hidden md:flex-row lg:gap-12'>
            <div className='relative h-full border-backgroundShadow px-12 drop-shadow-2xl sm:aspect-[2/3] sm:min-h-[425px] sm:self-center sm:px-0'>
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
                  priority={!backdropSrc}
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
}; */
