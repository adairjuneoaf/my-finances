// React Imports
import React, { ReactNode } from 'react'

// Chakra Imports
import { Skeleton } from '@chakra-ui/react'

// Typings[TypeScript]
interface ISkeletonComponentProps {
  children: ReactNode
  isLoading?: boolean
}

const SkeletonComponent: React.FC<ISkeletonComponentProps> = ({ children, isLoading = false }) => {
  return (
    <Skeleton
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

export default SkeletonComponent
