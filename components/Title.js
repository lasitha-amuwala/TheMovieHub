import React from 'react';
import Head from 'next/head';

const Title = ({ title }) => (
  <Head>
    <title>{`${title} - ${process.env.title}`}</title>
  </Head>
);

export default Title;
