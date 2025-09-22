'use client';
import EmblaCarousel from '@/components/carousel/EmblaCarousel';
import ImageModal from '@/components/modals/ImageModal';
import PersonImageCard from '@/components/person/PersonImageCard';
import { tmdb } from '@/utils/http-client/tmdb';
import { useQuery } from '@tanstack/react-query';

const PersonImageCarousel = ({ personId, title }) => {
  const { data, error, isLoading, isError } = useQuery(tmdb.people.images(personId));

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error: {error}</div>;

  const imagePaths = data?.profiles?.map(({ file_path }) => file_path) || [];

  return (
    <>
      <EmblaCarousel>
        {imagePaths.map((path, i) => (
          <PersonImageCard path={path} personId={personId} disableLink={false} key={i} />
        ))}
      </EmblaCarousel>
      <ImageModal paths={imagePaths} title={title} />
    </>
  );
};

export default PersonImageCarousel;
