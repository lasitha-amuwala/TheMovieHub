import React from 'react'
import { Nav } from './components/Nav'
import { Box } from '@chakra-ui/react'

export const App = () => {
  return (
    <div>
      <Nav/>
      <Box h={5000}></Box>
    </div>
  )
}
