import Link from 'next/link';
import NextImage from '../NextImage';
import useApiConfiguration from '../../src/hooks/useApiConfig';
import PersonPlaceholder from '../PersonPlaceholder';

const MovieCastCard = ({ data }) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    <div className='mx-1 h-full rounded sm:rounded-xl bg-card p-1 duration-300 hover:bg-cardHover sm:mx-2 lg:p-2'>
      <Link href={`/person/${data.id}`}>
        <div className='flex h-full flex-col gap-3'>
          <div className='relative shrink-0 drop-shadow-md'>
            {data.profile_path && (
              <NextImage
                src={getImageUrl(data.profile_path)}
                fill
                className='object-cover rounded-lg'
                unoptimized
              />
            )}
            <PersonPlaceholder />
          </div>
          <div className='flex grow flex-col justify-center text-center text-sm sm:text-sm'>
            <div className='font-medium'>{data.name}</div>
            <div className='text-slate-300'>{data.character ? data.character : 'Unknown'}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default MovieCastCard;
