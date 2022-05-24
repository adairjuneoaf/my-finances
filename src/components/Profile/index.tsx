// Imports React
import React from "react";

// Imports Next

// Chakra Imports
import { Avatar, Text, Wrap, WrapItem } from "@chakra-ui/react";

// Components Imports

// Another Imports
import {} from "react-icons/ri";

const ProfileComponent: React.FC = () => {
  return (
    <Wrap spacing="3" alignItems="center">
      <WrapItem>
        <Avatar name="Adair Juneo" src="https://github.com/adairjuneoaf.png" size="md" />
      </WrapItem>
      <WrapItem flexDirection="column">
        <Text as="h3" fontSize="18px" fontWeight="bold" color="gray.100">
          Adair Juneo
        </Text>
        <Text as="p" fontSize="12px" fontWeight="medium" color="gray.500">
          adair_juneo@hotmail.com
        </Text>
      </WrapItem>
    </Wrap>
  );
};

export default ProfileComponent;
