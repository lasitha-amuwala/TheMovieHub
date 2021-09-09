import React from 'react'
import { Nav } from './Nav'
import { Box } from '@chakra-ui/react'

export const App = () => {
  return (
    <div>
      <Nav/>
      <Box h={5000}></Box>
    </div>
  )
}
