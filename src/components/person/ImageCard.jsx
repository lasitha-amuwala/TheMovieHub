export const ImageCard = ({ children }) => {
  return (
    <div className='relative aspect-[2/3]'>
      {children}
      <div className='absolute top-0 h-full w-full opacity-10 transition-colors duration-200 hover:bg-white'></div>
    </div>
  );
};
