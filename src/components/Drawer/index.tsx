// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import {
  Text,
  Flex,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from '@chakra-ui/react'

// Components Imports
import { TransactionBody } from './transaction'
import { PaymentMethodBody } from './paymentMethod'
import { CreditorDebtorBody } from './creditorDebtor'

// Context Imports
import { ContextDrawer } from '../../contexts/contextDrawer'

const DrawerComponent: React.FC = () => {
  const { disclosure, drawerType } = useContext(ContextDrawer)

  const { onClose, isOpen } = disclosure

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      size='md'
      colorScheme='gray'
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor='gray.800'>
        <DrawerCloseButton />

        {drawerType === 'default' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Drawer padrão
              </Text>
            </DrawerHeader>
            <Flex
              width='100%'
              height='auto'
              paddingY={'2'}
              paddingX={'6'}
              display='flex'
              flexDirection='column'
              justifyContent='flex-start'
            >
              Drawer padrão do app...
            </Flex>
          </>
        )}

        {drawerType === 'new-transaction' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Novo lançamento
              </Text>
            </DrawerHeader>
            <TransactionBody />
          </>
        )}
        {drawerType === 'edit-transaction' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Editar lançamento
              </Text>
            </DrawerHeader>
            <TransactionBody />
          </>
        )}
        {drawerType === 'new-payment-method' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Novo método de pagamento
              </Text>
            </DrawerHeader>

            <PaymentMethodBody />
          </>
        )}
        {drawerType === 'edit-payment-method' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Editar método de pagamento
              </Text>
            </DrawerHeader>
            <PaymentMethodBody />
          </>
        )}
        {drawerType === 'new-creditor-debtor' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Novo credor/devedor
              </Text>
            </DrawerHeader>
            <CreditorDebtorBody />
          </>
        )}
        {drawerType === 'edit-creditor-debtor' && (
          <>
            <DrawerHeader borderBottom='2px' borderColor='gray.700'>
              <Text as='h2' fontSize='24px'>
                Editar credor/devedor
              </Text>
            </DrawerHeader>
            <CreditorDebtorBody />
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComponent
