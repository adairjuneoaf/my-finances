// Imports React
import { useContextSelector } from 'use-context-selector'

// Chakra Imports
import {
  Badge,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

// Utils Imports
import { PaymentMethodsPageContext } from '../../../../../contexts/pages/records'
import { formatDateToNow } from '../../../../../utils/formatDate'
import { getDataPaymentMethod } from './helpers'

export const ModalDetailsPaymentMethods = () => {
  const modalDisclosure = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.modalDisclosure,
  )
  const paymentMethodIdForViewDetails = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.paymentMethodIdForViewDetails,
  )

  const { isOpen, onClose } = modalDisclosure

  const paymentMethodData = getDataPaymentMethod(paymentMethodIdForViewDetails)

  const { paymentMethod } = paymentMethodData

  return (
    <Modal
      closeOnEsc
      isCentered
      blockScrollOnMount
      closeOnOverlayClick
      size='4xl'
      colorScheme='gray'
      scrollBehavior='inside'
      motionPreset='slideInBottom'
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor='gray.800'
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#353646',
          },
        }}
      >
        <ModalHeader paddingTop='6' paddingX='8' fontSize='24px' color='gray.600' cursor='default'>
          Detalhes do método de pagamento
        </ModalHeader>
        <ModalCloseButton marginTop='3' marginX='2' padding='5' color='gray.600' />
        <ModalBody paddingX='8'>
          <VStack spacing='2' alignItems='flex-start'>
            <Text as='h2' fontSize='22px' fontWeight='semibold'>
              {paymentMethod?.title}
            </Text>
          </VStack>
          <HStack marginY='4' spacing='3'>
            {paymentMethod?.status === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                ATIVO
              </Badge>
            )}
            {paymentMethod?.status === '0' && (
              <Badge variant='solid' colorScheme='red' padding='1'>
                INATIVO
              </Badge>
            )}
          </HStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Outras informações do método de pagamento
            </Text>
            {paymentMethod?.anotherInformation ? (
              <Text
                as='p'
                fontSize='16px'
                fontWeight='medium'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                {paymentMethod.anotherInformation}
              </Text>
            ) : (
              <Text
                as='p'
                fontSize='16px'
                fontStyle='italic'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                Não existem mais informações...
              </Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter
          paddingX='8'
          fontSize='12px'
          fontStyle='italic'
          color='gray.600'
          cursor='default'
          justifyContent='flex-start'
        >
          {paymentMethod?.id}&nbsp;
          {paymentMethod?.createdAt && `- criado ${formatDateToNow(paymentMethod?.createdAt)}`}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
