// Imports React
import React from 'react'

// Chakra Imports
import { Flex } from '@chakra-ui/react'

// Components Imports
import MenuSectionNavigation from './MenuSection'
import MenuItemNavigation from './MenuItemSection'

// Contexts Imports

// Another Imports
import { FiSettings } from 'react-icons/fi'
import { RiDashboardLine, RiFileListLine } from 'react-icons/ri'

// Typings[TypeScript]

const SideBarNavigationComponent: React.FC = () => {
  return (
    <Flex
      gap='10'
      paddingX='6'
      width='100%'
      height='100%'
      maxHeight='86vh'
      minWidth='288px'
      borderRadius='10'
      flexDirection='column'
    >
      <MenuSectionNavigation title='Geral'>
        <MenuItemNavigation
          title='Dashboard'
          icon={RiDashboardLine}
          route='/dashboard'
          description='Ir até a página de Dashboard'
        />
        <MenuItemNavigation
          title='Lançamentos'
          icon={RiFileListLine}
          route='/transactions'
          description='Ir até a página de Lançamentos'
        />
        <MenuItemNavigation
          title='Cadastros'
          icon={FiSettings}
          route='/records'
          description='Ir até a página de Cadastros'
        />
      </MenuSectionNavigation>
    </Flex>
  )
}

export default SideBarNavigationComponent
