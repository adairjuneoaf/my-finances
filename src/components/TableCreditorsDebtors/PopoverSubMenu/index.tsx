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
const ModalDetailsCreditorsDebtors = dynamic(() => import('../ModalDetailsCreditorsDebtors'), {
  ssr: false,
  suspense: false,
})

// Contexts Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// API Services
import { patchStatusUniqueCreditorDebtor } from '../../../services/api'

// Another Imports
import { FiEdit, FiEye, FiMoreVertical, FiPower } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'
import { CreditorDebtorType } from '../../../@types/CreditorDebtorType'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ creditorDebtorID, status }) => {
  const { handleDrawerEditCreditorDebtor } = useContext(ContextDrawer)

  const creditorDebtorSelected = useRef<CreditorDebtorType | undefined>(undefined)

  const queryClient = useQueryClient()

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Credores/Devedores',
  })

  const { mutateAsync, isLoading } = useMutation(patchStatusUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const handleCreditorDebtorStatus = async (status: string) => {
    await mutateAsync(
      {
        id: creditorDebtorID,
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

  const getCreditorDebtor = (id: string) => {
    const dataCache = queryClient.getQueryData<Array<CreditorDebtorType>>(['creditors_debtors'])

    creditorDebtorSelected.current = dataCache?.find((creditorDebtor) => creditorDebtor.id === id)

    onOpen()
  }

  return (
    <Fragment>
      <ModalDetailsCreditorsDebtors
        isOpen={isOpen}
        onClose={onClose}
        data={creditorDebtorSelected.current}
      />
      <Popover trigger='hover'>
        <Tooltip hasArrow label='A????es' shouldWrapChildren marginTop='3'>
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
                  aria-label='more-details-creditorDebtor'
                  icon={<FiEye fontSize='24' color='white' />}
                  backgroundColor='blue.500'
                  colorScheme='blue'
                  disabled={isLoading}
                  onClick={() => {
                    getCreditorDebtor(creditorDebtorID)
                  }}
                />
              </Tooltip>
              <Tooltip hasArrow label='Editar'>
                <IconButton
                  aria-label='edit-creditorDebtor'
                  icon={<FiEdit fontSize='24' color='white' />}
                  backgroundColor='green.500'
                  colorScheme='green'
                  disabled={isLoading}
                  onClick={() => {
                    handleDrawerEditCreditorDebtor(creditorDebtorID)
                  }}
                />
              </Tooltip>
              {status === '1' ? (
                <Tooltip hasArrow label='Inativar'>
                  <IconButton
                    aria-label='inactive-creditorDebtor'
                    icon={<FiPower fontSize='24' color='white' />}
                    backgroundColor='red.500'
                    colorScheme='red'
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={() => {
                      handleCreditorDebtorStatus('0')
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip hasArrow label='Ativar'>
                  <IconButton
                    aria-label='active-creditorDebtor'
                    icon={<FiPower fontSize='24' color='white' />}
                    backgroundColor='green.500'
                    colorScheme='green'
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={() => {
                      handleCreditorDebtorStatus('1')
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
