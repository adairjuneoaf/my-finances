// Imports React
import React from 'react'

// Chakra Imports
import {
  Text,
  Badge,
  Modal,
  HStack,
  VStack,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react'

// React-Query Imports
import { useQueryClient } from 'react-query'

// date-fns Imports
import { fromUnixTime } from 'date-fns'

// Utils Imports
import { formatDateToNow, formatDetailedDate } from '../../../utils/formatDate'
import { formatValueToMoney } from '../../../utils/formatValueToMoney'

// Typings[TypeScript]
import { TransactionDataType } from '../../../@types/TransactionDataType'
import { CreditorDebtorType } from '../../../@types/CreditorDebtorType'
import { PaymentMethodType } from '../../../@types/PaymentMethodType'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  data?: TransactionDataType
}

const getPaymentMethodDetails = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<Array<PaymentMethodType>>(['payment_methods'])

  const paymentMethod = data?.find((paymentMethod) => paymentMethod.id === id)

  return paymentMethod?.title
}

const getCreditorDebtorDetails = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<Array<CreditorDebtorType>>(['creditors_debtors'])

  const creditorDebtor = data?.find((creditorDebtor) => creditorDebtor.id === id)

  return creditorDebtor?.title
}

export default function ModalDetailsTransaction({ isOpen, onClose, data }: IModalProps) {
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
          Detalhes do lançamento
        </ModalHeader>
        <ModalCloseButton marginTop='3' marginX='2' padding='5' color='gray.600' />
        <ModalBody paddingX='8'>
          <VStack spacing='2' alignItems='flex-start'>
            <Text as='h2' fontSize='22px' fontWeight='semibold'>
              {data?.title}
            </Text>
            <Text as='p' fontSize='18px' fontStyle='italic'>
              {data?.description}
            </Text>
          </VStack>
          <HStack marginY='4' spacing='3'>
            {data?.type === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                ENTRADA
              </Badge>
            )}
            {data?.type === '0' && (
              <Badge variant='solid' colorScheme='red' padding='1'>
                SAÍDA
              </Badge>
            )}
            {data?.status === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                CONCLUÍDO
              </Badge>
            )}
            {data?.status === '0' && (
              <Badge variant='solid' colorScheme='yellow' padding='1'>
                EM ABERTO
              </Badge>
            )}
          </HStack>
          <VStack marginY='4' spacing='2' alignItems='flex-start'>
            <Text as='p' fontSize='16px'>
              Lançamento - &nbsp;
              <time
                dateTime={`${fromUnixTime(Number(data?.dateEntriesTransaction) / 1000)}`}
                style={{ fontWeight: '600' }}
              >
                {formatDetailedDate(data?.dateEntriesTransaction)}
              </time>
            </Text>
            <Text as='p' fontSize='16px'>
              Vencimento - &nbsp;
              <time
                dateTime={`${fromUnixTime(Number(data?.dateDueTransaction) / 1000)}`}
                style={{ fontWeight: '600' }}
              >
                {formatDetailedDate(data?.dateDueTransaction)}
              </time>
            </Text>
          </VStack>
          <VStack marginY='4' spacing='2' alignItems='flex-start'>
            <Text as='p' fontSize='22px' fontWeight='semibold'>
              {formatValueToMoney(data?.valueTransaction)}
            </Text>
          </VStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Dados para pagamento
            </Text>
            {data?.dataForPayment ? (
              <Text
                as='p'
                fontSize='16px'
                fontWeight='medium'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                {data.dataForPayment}
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
                Não existem mais dados...
              </Text>
            )}
          </VStack>
          <HStack marginY='4' spacing='6' alignItems='flex-start'>
            <VStack alignItems='flex-start' spacing='1'>
              <Text fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
                Método de Pagamento
              </Text>
              <Text fontStyle='normal' fontWeight='normal' color='gray.50'>
                {getPaymentMethodDetails(data?.paymentMethod)}
              </Text>
            </VStack>
            <VStack alignItems='flex-start' spacing='1'>
              <Text fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
                Credor/Devedor
              </Text>
              <Text fontStyle='normal' fontWeight='normal' color='gray.50'>
                {getCreditorDebtorDetails(data?.creditorDebtor)}
              </Text>
            </VStack>
          </HStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Outras informações do lançamento
            </Text>
            {data?.anotherInformation ? (
              <Text
                as='p'
                fontSize='16px'
                fontWeight='medium'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                {data.anotherInformation}
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
          {data?.id} {data?.createdAt && `- criado ${formatDateToNow(data?.createdAt)}`}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
