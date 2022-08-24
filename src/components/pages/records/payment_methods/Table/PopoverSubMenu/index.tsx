// Imports React
import React, { Fragment, useContext, useRef } from 'react'

// Imports Next
import dynamic from 'next/dynamic'

// Chakra Imports
import {
  Button,
  HStack,
  Popover,
  Tooltip,
  IconButton,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// Components Dynamic Imports
const ModalDetailsPaymentMethods = dynamic(() => import('../ModalDetailsPaymentMethods'), {
  ssr: false,
  suspense: false,
})

// Contexts Imports
import { ContextDrawer } from '../../../../../../contexts/contextDrawer'

// API Services
import { patchStatusUniquePaymentMethod } from '../../../../../../services/api'

// Another Imports
import { FiEdit, FiEye, FiMoreVertical, FiPower } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'
import { PaymentMethodType } from '../../../../../../@types/PaymentMethodType'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ paymentMethodID, status }) => {
  const { handleDrawerEditPaymentMethod } = useContext(ContextDrawer)

  const paymentMethodSelected = useRef<PaymentMethodType | undefined>(undefined)

  const queryClient = useQueryClient()

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Métodos de pagamento',
  })

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
          toast({ description: 'Status alterado com sucesso!', status: 'success' })
        },
        onError: () => {
          toast({ description: 'Erro ao alterar o status.', status: 'error' })
        },
      },
    )
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getPaymentMethod = (id: string) => {
    const dataCache = queryClient.getQueryData<Array<PaymentMethodType>>(['payment_methods'])

    paymentMethodSelected.current = dataCache?.find((paymentMethod) => paymentMethod.id === id)

    onOpen()
  }

  return (
    <Fragment>
      <ModalDetailsPaymentMethods
        isOpen={isOpen}
        onClose={onClose}
        data={paymentMethodSelected.current}
      />
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
                  onClick={() => {
                    getPaymentMethod(paymentMethodID)
                  }}
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
    </Fragment>
  )
}

export default PopoverSubMenuComponent
