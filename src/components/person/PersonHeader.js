'use client';
import React from 'react';
import ProfileTemplate from '../ProfileTemplate';
import { getLocaleDate } from '@/utils/commonUtils';
import { FaInstagram, FaFacebook, FaTwitter, FaImdb } from 'react-icons/fa';
import IconButton from '../IconButton';
import ReadMore from '../ReadMore';
import { tmdb } from '@/utils/http-client/tmdb';
import { useQuery } from '@tanstack/react-query';

const socialsConfig = {
  instagram: {
    url: 'https://www.instagram.com/',
    icon: <FaInstagram />,
  },
  twitter: {
    url: 'https://twitter.com/',
    icon: <FaTwitter />,
  },
  facebook: {
    url: 'https://www.facebook.com/',
    icon: <FaFacebook />,
  },
  imdb: {
    url: 'https://www.imdb.com/name/',
    icon: <FaImdb />,
  },
};

const renderSocials = (key, value) => {
  const id = key.split('_id')[0];
  if (!value || !socialsConfig.hasOwnProperty(id)) return null;
  return (
    <a href={socialsConfig[id].url + value} key={key}>
      <IconButton icon={socialsConfig[id].icon} />
    </a>
  );
};

const PersonHeader = ({ personId }) => {
  const { data: personData, error, isLoading, isError } = useQuery(tmdb.people.person(personId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error... {error}</div>;

  const profile_path = personData?.profile_path;
  const name = personData?.name || '';
  const external_ids = personData?.external_ids || {};
  const { birthday, deathday, place_of_birth, biography } = personData;

  return (
    <ProfileTemplate imageSrc={profile_path} imageAlt={name}>
      <div className='flex h-full flex-col justify-center gap-6 py-5'>
        <div className='flex flex-wrap items-center gap-3 text-3xl font-bold sm:text-5xl'>
          <div className='shrink-0 grow'>{name}</div>
          <div className='flex gap-2 text-2xl'>
            {Object.entries(external_ids).map(([key, value]) => renderSocials(key, value))}
          </div>
        </div>
        <div>
          <div className='text-slate-300'>
            <span className='pr-2 font-semibold text-white'>Born:</span>
            {birthday ? getLocaleDate(birthday) : 'Birthday not available'}
          </div>
          {deathday && (
            <div className='text-slate-300'>
              <span className='pr-2 font-bold text-white'>Died: </span>
              {getLocaleDate(deathday)}
            </div>
          )}
        </div>
        {place_of_birth && (
          <div className='text-slate-300'>
            <span className='pr-1 font-semibold text-white'>Place of Birth: </span>
            {place_of_birth}
          </div>
        )}
        <div>
          <div className='mb-2 text-xl font-bold '>About {name.split(' ')[0]}</div>
          <div className='whitespace-pre-line text-slate-300'>
            {biography ? (
              <ReadMore lines={6} text={biography} bg={'backgroundShadow'} />
            ) : (
              `Biography not available.`
            )}
          </div>
        </div>
      </div>
    </ProfileTemplate>
  );
};

export default PersonHeader;
