// Imports React
import React from 'react'

// Imports next-auth
import { signOut, useSession } from 'next-auth/react'

// Chakra Imports
import { IconButton, Flex, Tooltip } from '@chakra-ui/react'

// Components Imports

// Another Imports
import { FiBell, FiLogOut } from 'react-icons/fi'

const ActionBarComponent: React.FC = () => {
  const { status } = useSession()
  return (
    <Flex gap='3' alignItems='center' justifyContent='center' flexDirection='row'>
      <Tooltip hasArrow label='Notificações' colorScheme='gray'>
        <IconButton
          aria-label='notifications'
          backgroundColor='transparent'
          colorScheme='gray'
          _hover={{ backgroundColor: 'gray.900' }}
          icon={<FiBell color='gray.100' fontSize='22' />}
        />
      </Tooltip>
      <Tooltip hasArrow label='Efetuar logout'>
        <IconButton
          aria-label='logout-user'
          backgroundColor='transparent'
          colorScheme='gray'
          _hover={{ backgroundColor: 'gray.900' }}
          icon={<FiLogOut color='gray.100' fontSize='22' />}
          onClick={() => {
            signOut({
              callbackUrl: '/',
            })
          }}
          disabled={!!(status === 'loading')}
        />
      </Tooltip>
    </Flex>
  )
}

export default ActionBarComponent
