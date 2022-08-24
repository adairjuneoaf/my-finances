// Imports React
import React, { useContext, useEffect } from 'react'

// Chakra Imports
import {
  Text,
  Drawer,
  Radio,
  HStack,
  VStack,
  Button,
  useToast,
  FormLabel,
  DrawerBody,
  RadioGroup,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  FormErrorMessage,
  DrawerCloseButton,
} from '@chakra-ui/react'

// Component Imports
import { Input, Skeleton, InputTextArea } from '../../../../common'

// Context Imports
import { CreditorsDebtorsPageContext } from '../../../../../contexts/pages/records'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// ReactHookForms Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Validation Imports
import { formValidations } from './formValidations'

// API Services
import {
  putUniqueCreditorDebtor,
  getUniqueCreditorDebtor,
  postUniqueCreditorDebtor,
} from '../../../../../services/api'

// Another Imports
import { v4 as uuid } from 'uuid'
import { FiEdit, FiSave, FiX } from 'react-icons/fi'

// Typings[TypeScript]
import { CreditorDebtorType } from '../../../../../@types/CreditorDebtorType'

export const DrawerCreditorsDebtors: React.FC = () => {
  const { handleSubmit, register, formState, reset, control, setValue } =
    useForm<CreditorDebtorType>({
      resolver: yupResolver(formValidations),
      mode: 'onBlur',
      defaultValues: {
        title: '',
        status: '',
        anotherInformation: '',
      },
    })

  const {
    isLoading,
    isEditing,
    disclosure,
    toggleIsEditing,
    toggleIsLoading,
    creditorDebtorIdForEdit,
    resetCreditorDebtorIdForEdit,
  } = useContext(CreditorsDebtorsPageContext)

  const { onClose, isOpen } = disclosure

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Credores/Devedores',
  })

  const { errors, isSubmitting } = formState

  const queryClient = useQueryClient()

  const { mutateAsync: mutateAsyncNewCreditorDebtor } = useMutation(postUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const { mutateAsync: mutateAsyncEditCreditorDebtor } = useMutation(putUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const submitNewCreditorDebtor: SubmitHandler<
    Omit<CreditorDebtorType, 'id' | 'createdAt'>
  > = async (data) => {
    await mutateAsyncNewCreditorDebtor(
      {
        id: uuid(),
        createdAt: new Date().getTime(),
        ...data,
      },
      {
        onSuccess: () => {
          toast({ description: 'Credor/Devedor criado com sucesso!', status: 'success' })
          reset()
        },
        onError: () => {
          toast({ description: 'Erro na criação do Credor/Devedor.', status: 'error' })
        },
      },
    )
  }

  const submitEditCreditorDebtor: SubmitHandler<CreditorDebtorType> = async (data) => {
    await mutateAsyncEditCreditorDebtor(
      {
        id: data.id,
        data,
      },
      {
        onSuccess: () => {
          toast({ description: 'Credor/Devedor editado com sucesso!', status: 'success' })
          onClose()
          reset()
          toggleIsEditing()
          resetCreditorDebtorIdForEdit()
        },
        onError: () => {
          toast({ description: 'Erro na edição do Credor/Devedor.', status: 'error' })
        },
      },
    )
  }

  const cancelSubmitCreditorDebtor = () => {
    onClose()
    reset()

    if (isEditing) {
      toggleIsEditing()
      resetCreditorDebtorIdForEdit()
    }
  }

  useEffect(() => {
    if (creditorDebtorIdForEdit !== null && isEditing) {
      getUniqueCreditorDebtor(creditorDebtorIdForEdit)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof CreditorDebtorType, value),
          )
        })
        .catch((error) => {
          onClose()
          toggleIsLoading()
          toggleIsEditing()
          resetCreditorDebtorIdForEdit()
          console.log('Error', error)
        })
        .finally(() => {
          toggleIsLoading()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={cancelSubmitCreditorDebtor}
      placement='right'
      size='md'
      colorScheme='gray'
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor='gray.800'>
        <DrawerCloseButton />
        <DrawerHeader borderBottom='2px' borderColor='gray.700'>
          {!isEditing ? (
            <Text as='h2' fontSize='24px'>
              Novo credor/devedor
            </Text>
          ) : (
            <Text as='h2' fontSize='24px'>
              Editar credor/devedor
            </Text>
          )}
        </DrawerHeader>
        <DrawerBody
          as='form'
          width='100%'
          height='auto'
          gap='3'
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#353646',
            },
          }}
        >
          <VStack spacing='3'>
            <Input
              id='title'
              type='text'
              label='Nome do Credor/Devedor'
              isRequired
              isLoadingValue={isLoading}
              {...register('title')}
              errorInput={errors.title}
            />
          </VStack>

          <HStack alignItems='flex-start'>
            <VStack alignItems='flex-start' flex='1'>
              <FormControl isInvalid={!!errors.status} isRequired>
                <FormLabel
                  htmlFor='status'
                  fontSize='lg'
                  padding='0'
                  marginY='2'
                  fontWeight='medium'
                >
                  Status do Credor/Devedor
                </FormLabel>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Skeleton isLoading={isLoading}>
                      <RadioGroup {...field}>
                        <HStack spacing='3'>
                          <Radio value='0' colorScheme='red'>
                            Inativo
                          </Radio>
                          <Radio value='1' colorScheme='green'>
                            Ativo
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </Skeleton>
                  )}
                />
                {errors.status && <FormErrorMessage>{errors?.status.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
          </HStack>

          <VStack alignItems='flex-start' spacing='3'>
            <InputTextArea
              id='anotherInformation'
              label='Outras informações'
              isLoadingValue={isLoading}
              placeholder='Outras informações relevantes sobre o Credor/Devedor...'
              {...register('anotherInformation')}
              errorInput={errors.anotherInformation}
            />
          </VStack>
        </DrawerBody>
        <DrawerFooter borderTop='2px' borderColor='gray.700'>
          <HStack>
            <Button
              type='button'
              leftIcon={<FiX fontSize='18' />}
              colorScheme='red'
              onClick={cancelSubmitCreditorDebtor}
              disabled={isSubmitting || isLoading}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              colorScheme='green'
              isLoading={isSubmitting}
              leftIcon={!isEditing ? <FiSave fontSize='18' /> : <FiEdit fontSize='18' />}
              onClick={
                !isEditing
                  ? handleSubmit(submitNewCreditorDebtor)
                  : handleSubmit(submitEditCreditorDebtor)
              }
              disabled={isSubmitting || isLoading}
            >
              Salvar
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
