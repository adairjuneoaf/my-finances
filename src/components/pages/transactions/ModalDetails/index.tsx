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

// Contexts Imports
import { TransactionsPageContext } from '../../../../contexts/pages/transactions'

// date-fns Imports
import { fromUnixTime } from 'date-fns'

// Utils Imports
import { formatDateToNow, formatDetailedDate } from '../../../../utils/formatDate'
import { formatValueToMoney } from '../../../../utils/formatValueToMoney'
import { getDataTransaction } from './helpers'

export const ModalDetailsTransaction = () => {
  const modalDisclosure = useContextSelector(
    TransactionsPageContext,
    (values) => values.modalDisclosure,
  )
  const transactionIdForViewDetails = useContextSelector(
    TransactionsPageContext,
    (values) => values.transactionIdForViewDetails,
  )

  const { isOpen, onClose } = modalDisclosure

  const transactionData = getDataTransaction(transactionIdForViewDetails)

  const { transaction, creditorDebtor, paymentMethod } = transactionData

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
              {transaction?.title}
            </Text>
            <Text as='p' fontSize='18px' fontStyle='italic'>
              {transaction?.description}
            </Text>
          </VStack>
          <HStack marginY='4' spacing='3'>
            {transaction?.type === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                ENTRADA
              </Badge>
            )}
            {transaction?.type === '0' && (
              <Badge variant='solid' colorScheme='red' padding='1'>
                SAÍDA
              </Badge>
            )}
            {transaction?.status === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                CONCLUÍDO
              </Badge>
            )}
            {transaction?.status === '0' && (
              <Badge variant='solid' colorScheme='yellow' padding='1'>
                EM ABERTO
              </Badge>
            )}
          </HStack>
          <VStack marginY='4' spacing='2' alignItems='flex-start'>
            <Text as='p' fontSize='16px'>
              Lançamento - &nbsp;
              <time
                dateTime={`${fromUnixTime(Number(transaction?.dateEntriesTransaction) / 1000)}`}
                style={{ fontWeight: '600' }}
              >
                {formatDetailedDate(transaction?.dateEntriesTransaction)}
              </time>
            </Text>
            <Text as='p' fontSize='16px'>
              Vencimento - &nbsp;
              <time
                dateTime={`${fromUnixTime(Number(transaction?.dateDueTransaction) / 1000)}`}
                style={{ fontWeight: '600' }}
              >
                {formatDetailedDate(transaction?.dateDueTransaction)}
              </time>
            </Text>
          </VStack>
          <VStack marginY='4' spacing='2' alignItems='flex-start'>
            <Text as='p' fontSize='22px' fontWeight='semibold'>
              {formatValueToMoney(transaction?.valueTransaction)}
            </Text>
          </VStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Dados para pagamento
            </Text>
            {transaction?.dataForPayment ? (
              <Text
                as='p'
                fontSize='16px'
                fontWeight='medium'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                {transaction.dataForPayment}
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
                {paymentMethod}
              </Text>
            </VStack>
            <VStack alignItems='flex-start' spacing='1'>
              <Text fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
                Credor/Devedor
              </Text>
              <Text fontStyle='normal' fontWeight='normal' color='gray.50'>
                {creditorDebtor}
              </Text>
            </VStack>
          </HStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Outras informações do lançamento
            </Text>
            {transaction?.anotherInformation ? (
              <Text
                as='p'
                fontSize='16px'
                fontWeight='medium'
                width='100%'
                padding='4'
                backgroundColor='gray.900'
                borderRadius='5'
              >
                {transaction.anotherInformation}
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
          {transaction?.id}{' '}
          {transaction?.createdAt && `- criado ${formatDateToNow(transaction?.createdAt)}`}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
