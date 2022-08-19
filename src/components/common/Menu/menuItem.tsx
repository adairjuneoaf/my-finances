// Imports React
import React, { ReactElement, ReactNode } from 'react'

// Chakra Imports
import { MenuItem as ChakraMenuItem, MenuItemProps } from '@chakra-ui/react'

// Typings[TypeScript]
interface MenuItensProps extends MenuItemProps {
  icon?: ReactElement
  children: ReactNode
}

const MenuItem: React.FC<MenuItensProps> = ({ icon, children = 'title_menu_item', ...props }) => {
  return (
    <ChakraMenuItem
      {...props}
      icon={icon && icon}
      _focus={{ backgroundColor: 'gray.700' }}
      _hover={{ backgroundColor: 'gray.700' }}
    >
      {children}
    </ChakraMenuItem>
  )
}

export default MenuItem
