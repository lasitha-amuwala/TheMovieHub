'use client';
import classNames from 'classnames';

type Props = {
  icon: React.ReactNode;
  className: string;
  onClick: () => void;
};

const IconButton = ({ icon, className = '', onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        'rounded-full bg-white bg-opacity-0 p-3 transition-all duration-200 hover:bg-opacity-5'
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
