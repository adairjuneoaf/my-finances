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

// Utils Imports
import { formatDateToNow } from '../../../utils/formatDate'

// Typings[TypeScript]
import { CreditorDebtorType } from '../../../@types/CreditorDebtorType'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  data?: CreditorDebtorType
}

export default function ModalDetailsCreditorsDebtors({ isOpen, onClose, data }: IModalProps) {
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
          Detalhes do credor/devedor
        </ModalHeader>
        <ModalCloseButton marginTop='3' marginX='2' padding='5' color='gray.600' />
        <ModalBody paddingX='8'>
          <VStack spacing='2' alignItems='flex-start'>
            <Text as='h2' fontSize='22px' fontWeight='semibold'>
              {data?.title}
            </Text>
          </VStack>
          <HStack marginY='4' spacing='3'>
            {data?.status === '1' && (
              <Badge variant='solid' colorScheme='green' padding='1'>
                ATIVO
              </Badge>
            )}
            {data?.status === '0' && (
              <Badge variant='solid' colorScheme='red' padding='1'>
                INATIVO
              </Badge>
            )}
          </HStack>
          <VStack marginY='4' alignItems='flex-start'>
            <Text as='p' fontSize='16px' fontStyle='italic' fontWeight='semibold' color='gray.600'>
              Outras informações do credor/devedor
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
