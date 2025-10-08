'use client';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

type ReadMoreProps = {
  /** Number of lines to show before truncation */
  lines: number;
  /** The text content to truncate */
  text: string;
  /** Tailwind background color suffix (e.g., 'blue-500') */
  bg: string;
};

const ReadMore: React.FC<ReadMoreProps> = ({ lines, text, bg }) => {
  const [truncated, setTruncated] = useState<boolean>(true);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  // 👇 Make sure the ref is properly typed as an HTMLDivElement
  const textRef = useRef<HTMLDivElement | null>(null);

  // 👇 Style type: React.CSSProperties
  const style: React.CSSProperties = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical' as any, // TS doesn't know about this custom property
    WebkitLineClamp: String(lines),
  };

  useEffect(() => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      if (clientHeight === scrollHeight) {
        setIsEnabled(false); // Text fits without truncation, disable "Read more"
      }
    }
  }, []);

  if (!isEnabled) return <div>{text}</div>;

  return (
    <div className='relative'>
      <div ref={textRef} style={truncated ? style : undefined}>
        {text}
      </div>

      <div className={classNames('flex w-full', { 'absolute bottom-0': truncated })}>
        <div className='grow bg-gradient-to-r from-transparent to-backgroundShadow'></div>

        <button
          type='button'
          onClick={() => setTruncated(prev => !prev)}
          className={`bg-${bg} bg-backgroundShadow py-0 px-2 font-semibold text-accentBlue transition-colors duration-150 hover:text-accentBlueHover`}
        >
          {truncated ? 'Read More' : 'Read Less'}
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
