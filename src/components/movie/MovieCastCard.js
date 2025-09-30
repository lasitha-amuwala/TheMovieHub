import Link from 'next/link';
import NextImage from '../NextImage';
import useApiConfiguration from '@/hooks/useApiConfig';
import PersonPlaceholder from '../PersonPlaceholder';
import RippleWrapper from '@/components/RippleWrapper';

const MovieCastCard = ({ data }) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    <Link href={`/person/${data.id}`} scroll prefetch>
      <RippleWrapper className='h-full rounded sm:rounded-xl p-1 duration-300 hover:bg-white/15 bg-white/5 lg:p-2'>
        <div className='flex h-full flex-col gap-3'>
          <div className='relative shrink-0 drop-shadow-md'>
            {data.profile_path && (
              <NextImage
                src={getImageUrl(data.profile_path)}
                alt={data.name}
                fill
                className='object-cover rounded-lg'
                unoptimized
              />
            )}
            <PersonPlaceholder />
          </div>
          <div className='flex grow flex-col justify-center text-center text-sm sm:text-sm'>
            <p className='font-medium'>{data.name}</p>
            <p className='text-slate-300'>{data.character ? data.character : 'Unknown'}</p>
          </div>
        </div>
      </RippleWrapper>
    </Link>
  );
};
export default MovieCastCard;
