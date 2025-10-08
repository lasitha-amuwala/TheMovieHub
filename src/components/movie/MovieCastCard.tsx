import Link from 'next/link';
import Image from '../Image';
import useApiConfiguration from '@/hooks/useApiConfig';
import PersonPlaceholder from '../PersonPlaceholder';
import RippleWrapper from '@/components/RippleWrapper';
import { Cast } from '@/types/movies';

const MovieCastCard = ({ cast }: { cast: Cast }) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    <Link href={`/person/${cast.id}`} scroll prefetch>
      <RippleWrapper className='h-full rounded sm:rounded-xl p-1 duration-300 hover:bg-white/15 bg-white/5 lg:p-2'>
        <div className='flex h-full flex-col gap-3'>
          <div className='relative shrink-0 drop-shadow-md'>
            {cast.profile_path && (
              <Image
                src={getImageUrl(cast.profile_path)}
                alt={cast.name}
                fill
                className='object-cover rounded-lg'
                unoptimized
              />
            )}
            <PersonPlaceholder />
          </div>
          <div className='flex grow flex-col justify-center text-center text-sm sm:text-sm'>
            <p className='font-medium'>{cast.name}</p>
            <p className='text-slate-300'>{cast.character ? cast.character : 'Unknown'}</p>
          </div>
        </div>
      </RippleWrapper>
    </Link>
  );
};

export default MovieCastCard;
