// React Imports
import React from 'react'

// ChakraUI Imports
import { Box, Center, Divider, Flex } from '@chakra-ui/react'

// Components Imports
import { ActionBar } from '../ActionBar'
import { Logo } from '../Logo'
import { Profile } from '../Profile'

export const Header: React.FC = () => {
  return (
    <Box
      as='header'
      width='100%'
      marginX='auto'
      height='100%'
      margin='auto'
      paddingY='2'
      paddingX='6'
      display='flex'
      alignItems='center'
      flexDirection='row'
      backgroundColor='gray.800'
      justifyContent='space-between'
    >
      <Flex flex='2' paddingX='2'>
        <Logo />
      </Flex>
      <Flex alignItems='center' justifyContent='center' flex='8' paddingX='2' />
      <Flex alignItems='center' justifyContent='flex-end' flexDirection='row' flex='5' paddingX='2'>
        <ActionBar />
        <Center height='32px' paddingX='4'>
          <Divider orientation='vertical' color='gray.100' />
        </Center>
        <Profile />
      </Flex>
    </Box>
  )
}
