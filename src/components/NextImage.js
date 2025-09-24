import React from 'react';
import Image from 'next/image';

const NextImage = ({ src, alt, unoptimized = false, ...rest }) => {
  return <Image src={src} alt={alt} unoptimized={unoptimized} {...rest} />;
};

export default NextImage;
