import React from 'react';

type Props = {
  children: React.ReactElement<any>;
  blurRadius: number;
};

const Blur = ({ children, blurRadius }:Props) => {
  let radius: string;

  if (blurRadius > 64) radius = 'blur(64px)';
  else if (blurRadius < 0) radius = 'blur(0px)';
  else radius = `blur(${blurRadius}px)`;

  const style: React.CSSProperties = {
    filter: radius,
    WebkitFilter: radius,
  };

  return React.cloneElement(children, {
    style: { ...(children.props.style || {}), ...style },
  });
};

export default Blur;
