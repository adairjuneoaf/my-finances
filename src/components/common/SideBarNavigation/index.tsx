// Imports React
import React from 'react'

// Chakra Imports
import { Flex } from '@chakra-ui/react'

// Components Imports
import MenuSectionNavigation from './MenuSection'
import MenuItemNavigation from './MenuItemSection'

// Contexts Imports

// Another Imports
import { FiSettings, FiBarChart, FiList } from 'react-icons/fi'

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
          icon={FiBarChart}
          route='/dashboard'
          description='Ir até a página de Dashboard'
        />
        <MenuItemNavigation
          title='Lançamentos'
          icon={FiList}
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
