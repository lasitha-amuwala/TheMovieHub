import {
  Flex,
  Box,
  Text,
  HStack,
  Link,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';

export const Nav = () => {
  const { toggleColorMode } = useColorMode();

  const toggleDarkModeIcon = useColorModeValue(
    <FaMoon color="#A0AEC0" />,
    <FaSun color="#A0AEC0" />
  );

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      position="fixed"
      w="100%"
      px={4}
      top={0}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <HStack spacing={8} align={'center'}>
            <Text
              color={useColorModeValue('gray.700', 'white')}
            >
              MovieHub
            </Text>
            <HStack as="nav" spacing={4}>
              <Button variant="ghost">Movies</Button>
              <Button variant="ghost">Series</Button>
              <Button variant="ghost">Profile</Button>
              <Button variant="ghost">My List</Button>
            </HStack>
          </HStack>
        </Flex>
        <IconButton
          mt="1"
          fontSize="22px"
          aria-label="Toggles Dark Mode"
          onClick={toggleColorMode}
          icon={toggleDarkModeIcon}
        ></IconButton>
      </Flex>
    </Box>
  );
};
