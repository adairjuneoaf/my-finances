// Imports React
import React from 'react'

// Chakra Imports
import { Flex } from '@chakra-ui/react'

// Components Imports
import MenuSectionNavigation from './MenuSection'
import MenuItemNavigation from './MenuItemSection'

// Contexts Imports

// Another Imports
import { FiBarChart, FiCreditCard, FiList, FiUserPlus } from 'react-icons/fi'

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
          description='Página de Dashboard'
        />
        <MenuItemNavigation
          title='Lançamentos'
          icon={FiList}
          route='/transactions'
          description='Página de Lançamentos'
        />
      </MenuSectionNavigation>
      <MenuSectionNavigation title='Cadastros'>
        <MenuItemNavigation
          title='Métodos de Pagamento'
          icon={FiCreditCard}
          route='/records/payment_methods'
          description='Página de Métodos de Pagamento'
        />
        <MenuItemNavigation
          title='Credores/Devedores'
          icon={FiUserPlus}
          route='/records/creditors_debtors'
          description='Página de Credores/Devedores'
        />
      </MenuSectionNavigation>
    </Flex>
  )
}

export default SideBarNavigationComponent
