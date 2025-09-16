import React from 'react';

const Blur = ({ children, blurRadius }) => {
  let radius = 0;

  if (blurRadius > 64) radius = 'blur(64px)';
  else if (blurRadius < 0) radius = 'blur(0px)';
  else radius = `blur(${blurRadius}px)`;

  const style = {
    filter: radius,
    WebkitFilter: radius,
    MozFilter: radius,
    OFilter: radius,
    msFilter: radius,
  };

  return <>{React.cloneElement(children, { style })}</>;
};

export default Blur;
//https://stackoverflow.com/questions/27583937/how-can-i-make-a-css-glass-blur-effect-work-for-an-overlay
