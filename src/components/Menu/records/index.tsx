// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'

// Context Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// Components Imports
import MenuItem from '../menuItem'

// Another Imports
import { FiCreditCard, FiSettings, FiUsers } from 'react-icons/fi'

const MenuRecordsComponent: React.FC = () => {
  const { handleDrawerNewPaymentMethod, handleDrawerNewCreditorDebtor } = useContext(ContextDrawer)

  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<FiSettings fontSize={'18px'} />} colorScheme='blue'>
        Cadastros
      </MenuButton>

      <MenuList backgroundColor='gray.800' borderColor='gray.700'>
        <MenuItem icon={<FiCreditCard fontSize={'16px'} />} onClick={handleDrawerNewPaymentMethod}>
          Formas de Pagamento
        </MenuItem>
        <MenuItem icon={<FiUsers fontSize={'16px'} />} onClick={handleDrawerNewCreditorDebtor}>
          Credores/Devedores
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuRecordsComponent
