// Imports React
import React, { ElementType } from 'react'

// Imports Next
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// Chakra Imports
import { HStack, Icon, Text } from '@chakra-ui/react'

// Components Imports

// Another Imports

// Typings[TypeScript]
interface MenuItemNavigationProps {
  icon?: ElementType
  title?: string
  route?: string
  description?: string
}

const MenuItemNavigation: React.FC<MenuItemNavigationProps> = ({
  icon,
  title,
  route = '/',
  description,
}) => {
  const { asPath } = useRouter()

  return (
    <NextLink passHref href={route}>
      <HStack
        spacing='4'
        width='100%'
        height='auto'
        margin='0'
        cursor='pointer'
        title={description}
        alignItems='center'
        _hover={{ color: 'green.500', transition: 'all  350ms' }}
        pointerEvents={`${asPath.includes(route) ? 'none' : 'initial'}`}
      >
        <Icon as={icon} fontSize='22px' color={`${asPath.includes(route) && 'green.500'}`} />
        <Text
          as='h2'
          fontSize='16px'
          fontWeight='medium'
          color={`${asPath.includes(route) && 'green.500'}`}
        >
          {title}
        </Text>
      </HStack>
    </NextLink>
  )
}

export default MenuItemNavigation
