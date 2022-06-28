// Imports React
import React, { ReactNode } from "react";

// Imports Next
import {} from "next/link";

// Chakra Imports
import { HStack, Box, VStack, Text, Heading } from "@chakra-ui/react";
import SkeletonComponent from "../Skeleton";

// Components Imports

// Another Imports

// Typings[TypeScript]
type CardComponentProps = {
  title: string;
  icon?: ReactNode;
  value: string;
  isLoading?: boolean;
};

const CardComponent: React.FC<CardComponentProps> = ({
  icon,
  title,
  value,
  isLoading,
}) => {
  return (
    <Box
      padding="8"
      gap="3"
      display="flex"
      flexDirection="column"
      width="100%"
      height="auto"
      borderRadius="10"
      backgroundColor="gray.800"
    >
      <HStack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {!!icon && icon}
        <Text as="h2" fontSize="24" fontWeight="medium">
          {title}
        </Text>
      </HStack>
      <SkeletonComponent isLoading={isLoading}>
        <VStack
          width="100%"
          height="auto"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Heading fontSize="28">{value}</Heading>
        </VStack>
      </SkeletonComponent>
    </Box>
  );
};

export default CardComponent;
