// React Imports
import React, { ReactNode } from 'react'

// Chakra Imports
import {
  Skeleton as SkeletonChakra,
  SkeletonCircle as SkeletonCircleChakra,
  SkeletonProps,
  SkeletonText as SkeletonTextChakra,
  SkeletonTextProps,
} from '@chakra-ui/react'

// Typings[TypeScript]
interface ISkeletonProps extends SkeletonProps {
  children: ReactNode
  isLoading?: boolean
}

interface ISkeletonTextProps extends SkeletonTextProps {
  children: ReactNode
  isLoading?: boolean
}

interface ISkeletonCircleProps extends SkeletonProps {
  isLoading?: boolean
}

export const Skeleton: React.FC<ISkeletonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <SkeletonChakra
      {...props}
      speed={0.65}
      isLoaded={!isLoading}
      fadeDuration={1.2}
      borderRadius='4'
      startColor='RGBA(255, 255, 255, 0.04)'
      endColor='RGBA(255, 255, 255, 0.08)'
    >
      {children}
    </SkeletonChakra>
  )
}

export const SkeletonText: React.FC<ISkeletonTextProps> = ({
  children,
  isLoading = false,
  noOfLines = 1,
  ...props
}) => {
  return (
    <SkeletonTextChakra
      {...props}
      width='100%'
      height='100%'
      skeletonHeight={'5'}
      noOfLines={noOfLines}
      speed={0.65}
      isLoaded={!isLoading}
      fadeDuration={1.2}
      borderRadius='4'
      startColor='RGBA(255, 255, 255, 0.04)'
      endColor='RGBA(255, 255, 255, 0.08)'
    >
      {children}
    </SkeletonTextChakra>
  )
}

export const SkeletonCircle: React.FC<ISkeletonCircleProps> = ({ isLoading = false, ...props }) => {
  return (
    <SkeletonCircleChakra
      {...props}
      speed={0.65}
      isLoaded={isLoading}
      fadeDuration={1.2}
      startColor='RGBA(255, 255, 255, 0.04)'
      endColor='RGBA(255, 255, 255, 0.08)'
    />
  )
}
