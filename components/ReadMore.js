import React, { useState, useRef, useEffect } from 'react';

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
      <div className={`${truncated && 'absolute bottom-0'} w-full`}>
        <div className={`flex justify-end bg-gradient-to-r from-transparent to-${bg}`}>
          <button
            onClick={() => setTruncated(!truncated)}
            className={`bg-${bg} rounded-lg py-0 px-2 font-semibold text-accentBlue transition-colors duration-150 hover:text-accentBlueHover`}
          >
            {truncated ? 'Read More' : 'Show Less'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
