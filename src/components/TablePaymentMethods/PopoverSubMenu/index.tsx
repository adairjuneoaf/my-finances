// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// Contexts Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// API Services
import { patchStatusUniquePaymentMethod } from '../../../services/api'

// Another Imports
import { FiEdit, FiEye, FiMoreVertical, FiPower } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ paymentMethodID, status }) => {
  const { handleDrawerEditPaymentMethod } = useContext(ContextDrawer)

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(patchStatusUniquePaymentMethod, {
    onSuccess: () => {
      queryClient.refetchQueries(['payment_methods'])
    },
  })

  const handlePaymentMethodStatus = async (status: string) => {
    await mutateAsync(
      {
        id: paymentMethodID,
        status,
      },
      {
        onSuccess: () => {
          console.info('Sucesso na mudança de status do Método de Pagamento. ✅')
        },
        onError: () => {
          console.warn('Error na mudança de status do Método de Pagamento! ❌')
        },
      },
    )
  }

  return (
    <Popover trigger='hover'>
      <Tooltip hasArrow label='Ações' shouldWrapChildren marginTop='3'>
        <PopoverTrigger>
          <Button backgroundColor='transparent' _hover={{ backgroundColor: 'gray.900' }}>
            <FiMoreVertical fontSize='24' color='white' />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent backgroundColor='gray.800' width='fit-content' borderColor='gray.700'>
        <PopoverBody>
          <HStack>
            <Tooltip hasArrow label='Detalhes'>
              <IconButton
                aria-label='more-details-paymentMethod'
                icon={<FiEye fontSize='24' color='white' />}
                backgroundColor='blue.500'
                colorScheme='blue'
                disabled={isLoading}
              />
            </Tooltip>
            <Tooltip hasArrow label='Editar'>
              <IconButton
                aria-label='edit-paymentMethod'
                icon={<FiEdit fontSize='24' color='white' />}
                backgroundColor='green.500'
                colorScheme='green'
                disabled={isLoading}
                onClick={() => {
                  handleDrawerEditPaymentMethod(paymentMethodID)
                }}
              />
            </Tooltip>
            {status === '1' ? (
              <Tooltip hasArrow label='Inativar'>
                <IconButton
                  aria-label='inactive-paymentMethod'
                  icon={<FiPower fontSize='24' color='white' />}
                  backgroundColor='red.500'
                  colorScheme='red'
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => {
                    handlePaymentMethodStatus('0')
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip hasArrow label='Ativar'>
                <IconButton
                  aria-label='active-paymentMethod'
                  icon={<FiPower fontSize='24' color='white' />}
                  backgroundColor='green.500'
                  colorScheme='green'
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => {
                    handlePaymentMethodStatus('1')
                  }}
                />
              </Tooltip>
            )}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverSubMenuComponent
