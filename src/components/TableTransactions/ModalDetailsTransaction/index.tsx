// Imports React
import React from 'react'

// Chakra Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  HStack,
  Text,
  VStack,
  Badge,
  Box,
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

export const ModalDetailsTransaction: React.FC<IModalProps> = ({ isOpen, onClose, data }) => {
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
      <ModalContent backgroundColor='gray.800'>
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
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Lançamento em{' '}
              <time
                dateTime={`${fromUnixTime(Number(data?.dateEntriesTransaction) / 1000)}`}
                style={{ fontStyle: 'normal' }}
              >
                {formatDetailedDate(data?.dateEntriesTransaction)}
              </time>
            </Text>
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Vencimento em{' '}
              <time
                dateTime={`${fromUnixTime(Number(data?.dateDueTransaction) / 1000)}`}
                style={{ fontStyle: 'normal' }}
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
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Dados para pagamento
            </Text>
            {data?.dataForPayment ? (
              <Box as='div' width='100%' padding='4' backgroundColor='gray.900' borderRadius='5'>
                <Text as='p' fontSize='16px' fontWeight='medium'>
                  {data.dataForPayment}
                </Text>
              </Box>
            ) : (
              <Box as='div' width='60%'>
                <Text as='p' fontSize='16px' fontStyle='italic'>
                  Não existem mais dados...
                </Text>
              </Box>
            )}
          </VStack>
          <HStack marginY='4' spacing='6' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Método de Pagamento
              <Text fontStyle='normal'>{getPaymentMethodDetails(data?.paymentMethod)}</Text>
            </Text>
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Credor/Devedor
              <Text fontStyle='normal'>{getCreditorDebtorDetails(data?.creditorDebtor)}</Text>
            </Text>
          </HStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic'>
              Outras informações do lançamento
            </Text>
            {data?.dataForPayment ? (
              <Box as='div' width='100%' padding='4' backgroundColor='gray.900' borderRadius='5'>
                <Text as='p' fontSize='16px' fontWeight='medium'>
                  {data.anotherInformation}
                </Text>
              </Box>
            ) : (
              <Box as='div' width='60%'>
                <Text as='p' fontSize='16px' fontStyle='italic'>
                  Não existem mais informações...
                </Text>
              </Box>
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
