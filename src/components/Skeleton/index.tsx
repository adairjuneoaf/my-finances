// React Imports
import React, { ReactNode } from 'react'

// Chakra Imports
import { Skeleton, SkeletonCircle, SkeletonProps } from '@chakra-ui/react'

// Typings[TypeScript]
interface ISkeletonComponentProps extends SkeletonProps {
  children: ReactNode
  isLoading?: boolean
}

interface ISkeletonCircleComponentProps extends SkeletonProps {
  isLoading?: boolean
}

export const SkeletonComponent: React.FC<ISkeletonComponentProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <Skeleton
      {...props}
      speed={0.65}
      isLoaded={!isLoading}
      fadeDuration={1.2}
      borderRadius='5'
      startColor='RGBA(255, 255, 255, 0.04)'
      endColor='RGBA(255, 255, 255, 0.08)'
    >
      {children}
    </Skeleton>
  )
}

export const SkeletonCircleComponent: React.FC<ISkeletonCircleComponentProps> = ({ isLoading = false, ...props }) => {
  return (
    <SkeletonCircle
      {...props}
      speed={0.65}
      isLoaded={isLoading}
      fadeDuration={1.2}
      startColor='RGBA(255, 255, 255, 0.04)'
      endColor='RGBA(255, 255, 255, 0.08)'
    />
  )
}
