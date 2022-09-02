// Imports React
import React from 'react'

// Imports Next

// Chakra Imports
import { HStack, IconButton, Tooltip } from '@chakra-ui/react'

// Contexts Imports

// API Services

// Another Imports
import { FiEdit, FiEye, FiPower } from 'react-icons/fi'

// Typings[TypeScript]
interface PopoverActionProps {
  id: string
  status: string
}

const PopoverSubMenu: React.FC<PopoverActionProps> = ({ id, status }) => {
  // const { selectPaymentMethodIdForEdit, toggleIsEditing, toggleIsLoading, disclosure } =
  //   useContext(PaymentMethodsPageContext)

  // const paymentMethodSelected = useRef<PaymentMethodType | undefined>(undefined)

  // const queryClient = useQueryClient()

  // const toast = useToast({
  //   position: 'top',
  //   duration: 1000 * 3, // 3 Seconds
  //   title: 'Métodos de pagamento',
  // })

  // const { mutateAsync, isLoading } = useMutation(patchStatusUniquePaymentMethod, {
  //   onSuccess: () => {
  //     queryClient.refetchQueries(['payment_methods'])
  //   },
  // })

  // const handlePaymentMethodStatus = async (status: string) => {
  //   await mutateAsync(
  //     {
  //       id: paymentMethodID,
  //       status,
  //     },
  //     {
  //       onSuccess: () => {
  //         toast({ description: 'Status alterado com sucesso!', status: 'success' })
  //       },
  //       onError: () => {
  //         toast({ description: 'Erro ao alterar o status.', status: 'error' })
  //       },
  //     },
  //   )
  // }

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const getPaymentMethod = (id: string) => {
  //   const dataCache = queryClient.getQueryData<Array<PaymentMethodType>>(['payment_methods'])

  //   paymentMethodSelected.current = dataCache?.find((paymentMethod) => paymentMethod.id === id)

  //   onOpen()
  // }

  // const handleEditPaymentMethod = (id: string) => {
  //   selectPaymentMethodIdForEdit(id)
  //   toggleIsEditing()
  //   toggleIsLoading()
  //   disclosure.onOpen()
  // }

  const handleToggleStatusPaymentMethod = (id: string) => {
    console.log(id)
    // selectTransactionIdForDelete(id)
    // dialogDisclosure.onOpen()
  }

  const handleEditPaymentMethod = (id: string) => {
    console.log(id)
    // selectTransactionIdForEdit(id)
    // toggleIsEditing()
    // toggleIsLoading()
    // drawerDisclosure.onOpen()
  }

  const handleViewDetailsPaymentMethod = (id: string) => {
    console.log(id)
    // selectTransactionIdForViewDetails(id)
    // modalDisclosure.onOpen()
  }

  return (
    <HStack>
      <Tooltip hasArrow label='Detalhes'>
        <IconButton
          aria-label='more-details-paymentMethod'
          icon={<FiEye fontSize='24' color='white' />}
          backgroundColor='blue.500'
          colorScheme='blue'
          // disabled={isLoading}
          onClick={() => {
            handleViewDetailsPaymentMethod(id)
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label='Editar'>
        <IconButton
          aria-label='edit-paymentMethod'
          icon={<FiEdit fontSize='24' color='white' />}
          backgroundColor='green.500'
          colorScheme='green'
          // disabled={isLoading}
          onClick={() => {
            handleEditPaymentMethod(id)
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
            // isLoading={isLoading}
            // disabled={isLoading}
            onClick={() => {
              handleToggleStatusPaymentMethod(id)
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
            // isLoading={isLoading}
            // disabled={isLoading}
            onClick={() => {
              handleToggleStatusPaymentMethod(id)
            }}
          />
        </Tooltip>
      )}
    </HStack>
  )
}

export default PopoverSubMenu
