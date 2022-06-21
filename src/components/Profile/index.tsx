// Imports React
import React from "react";

// Imports Next
import { useSession } from "next-auth/react";

// Chakra Imports
import { Avatar, Text, Wrap, WrapItem } from "@chakra-ui/react";

const ProfileComponent: React.FC = () => {
  const { data, status } = useSession();

  return (
    <Wrap spacing="3" alignItems="center">
      {status === "unauthenticated" ? (
        <>
          <WrapItem>
            <Avatar name="user_read_name" src="user_read_image" size="md" />
          </WrapItem>
          <WrapItem flexDirection="column">
            <Text as="h3" fontSize="18px" fontWeight="bold" color="gray.100">
              user_read_name
            </Text>
            <Text as="p" fontSize="12px" fontWeight="medium" color="gray.500">
              user_read_email
            </Text>
          </WrapItem>
        </>
      ) : (
        <>
          <WrapItem>
            <Avatar name={String(data?.user?.name)} src={String(data?.user?.image)} size="md" />
          </WrapItem>
          <WrapItem flexDirection="column">
            <Text as="h3" fontSize="18px" fontWeight="bold" color="gray.100">
              {data?.user?.name}
            </Text>
            <Text as="p" fontSize="12px" fontWeight="medium" color="gray.500">
              {data?.user?.email}
            </Text>
          </WrapItem>
        </>
      )}
    </Wrap>
  );
};

export default ProfileComponent;
