import React from 'react';
import NextImage, { ImageProps } from 'next/image';

const Image = ({ src, alt, unoptimized = false, ...rest }: ImageProps) => {
  return <NextImage src={src} alt={alt} unoptimized={unoptimized} {...rest} />;
};

export default Image;
