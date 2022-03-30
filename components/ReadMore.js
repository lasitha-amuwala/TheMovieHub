import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const ReadMore = ({ lines, text, bg }) => {
  const [truncated, setTruncated] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  const textRef = useRef(null);

  const style = {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': `${lines}`,
  };

  useEffect(() => {
    if (textRef.current && textRef.current.clientHeight == textRef.current.scrollHeight) {
      setIsEnabled(false);
    }
  }, []);

  if (!isEnabled) return <div>{text}</div>;

  return (
    <div className='relative'>
      <div ref={textRef} style={truncated ? style : null}>
        {text}
      </div>
      <div className={classNames('flex w-full', { 'absolute bottom-0': truncated })}>
        <div className={`grow bg-gradient-to-r from-transparent to-backgroundShadow`}></div>
        <button
          onClick={() => setTruncated(!truncated)}
          className={`bg-${bg} py-0 px-2 font-semibold text-accentBlue transition-colors duration-150 hover:text-accentBlueHover`}
        >
          {truncated ? 'Read More' : 'Read Less'}
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
