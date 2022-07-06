// React Imports
import React from "react";

// ChakraUI Imports
import { Box, Flex, Center, Divider } from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../Logo";
import ProfileComponent from "../Profile";
import ActionBarComponent from "../ActionBar";

const HeaderComponent: React.FC = () => {
  return (
    <Box
      as="header"
      width="100%"
      marginX="auto"
      height="100%"
      margin="auto"
      paddingY="2"
      paddingX="6"
      display="flex"
      alignItems="center"
      flexDirection="row"
      backgroundColor="gray.800"
      justifyContent="space-between"
    >
      <Flex flex="2" paddingX="2">
        <LogoComponent />
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flex="10"
        paddingX="2"
      />
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        flexDirection="row"
        flex="5"
        paddingX="2"
      >
        <ActionBarComponent />
        <Center height="32px" paddingX="4">
          <Divider orientation="vertical" color="gray.100" />
        </Center>
        <ProfileComponent />
      </Flex>
    </Box>
  );
};

export default HeaderComponent;
