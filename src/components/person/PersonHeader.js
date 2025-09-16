import React from 'react';
import ProfileTemplate from '../ProfileTemplate';
import { getLocaleDate } from '@/utils/commonUtils';
import { FaInstagram, FaFacebook, FaTwitter, FaImdb } from 'react-icons/fa';
import IconButton from '../IconButton';
import ReadMore from '../ReadMore';

const socials = {
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
  if (!value || !socials.hasOwnProperty(id)) return null;
  return (
    <a href={socials[id].url + value} key={key}>
      <IconButton icon={socials[id].icon} />
    </a>
  );
};

const PersonHeader = ({ person }) => {
  return (
    <ProfileTemplate imageSrc={person.profile_path} imageAlt={person.name}>
      <div className='flex h-full flex-col justify-center gap-6 py-5'>
        <div className='flex flex-wrap items-center gap-3 text-3xl font-bold sm:text-5xl'>
          <div className='shrink-0 grow'>{person.name}</div>
          <div className='flex gap-2 text-2xl'>
            {Object.entries(person.external_ids).map(([key, value]) => renderSocials(key, value))}
          </div>
        </div>
        <div>
          <div className='text-slate-300'>
            <span className='pr-2 font-semibold text-white'>Born:</span>
            {person.birthday ? getLocaleDate(person.birthday) : 'Birthday not available'}
          </div>
          {person.deathday && (
            <div className='text-slate-300'>
              <span className='pr-2 font-bold text-white'>Died: </span>
              {getLocaleDate(person.deathday)}
            </div>
          )}
        </div>
        {person.place_of_birth && (
          <div className='text-slate-300'>
            <span className='pr-1 font-semibold text-white'>Place of Birth: </span>
            {person.place_of_birth}
          </div>
        )}
        <div>
          <div className='mb-2 text-xl font-bold '>About {person.name.split(' ')[0]}</div>
          <div className='whitespace-pre-line text-slate-300'>
            {person.biography ? (
              <ReadMore lines={6} text={person.biography} bg={'backgroundShadow'} />
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
