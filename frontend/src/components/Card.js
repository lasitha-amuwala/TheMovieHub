import React from 'react'
import { Box } from '@chakra-ui/react';

export const Card = ({data}) => {
  return (
    <Box my={16} h={300} w={225} bg={'gray.600'}>
      <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}></img>
      <p>{data.title}</p>
    </Box>
  )
}
