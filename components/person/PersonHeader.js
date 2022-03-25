import React from 'react';
import ProfileTemplate from '../ProfileTemplate';
import useApiConfiguration from '../../src/hooks/useApiConfig';

const PersonHeader = ({ person }) => {
  const { getImageUrl } = useApiConfiguration();

  return (
    <ProfileTemplate
      imageSrc={getImageUrl(person.profile_path, { original: true })}
      imageAlt={person.name}
    >
      <div className='flex flex-col justify-center gap-6 py-5'>
        <div className='text-3xl font-bold sm:text-5xl'>{person.name}</div>
      </div>
    </ProfileTemplate>
  );
};

export default PersonHeader;
