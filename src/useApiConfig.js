import { apiQueries } from './http-client/apiQueries';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

const useApiConfiguration = () => {
  const { data: configuration } = useQuery({
    ...apiQueries.common.configuration(),
    staleTime: Infinity,
  });

  const getImageUrl = useCallback(
    (path, { original }) => {
      const { images } = configuration;
      const { secure_base_url } = images;

      return `${secure_base_url}/${original ? 'original' : 'w500'}${path}`;
    },
    [configuration]
  );

  return { getImageUrl };
};

export default useApiConfiguration;
