// Imports React
import React from "react";

// Chakra Imports
import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";

// Another Imports
import { FiEdit, FiTrash, FiEye, FiMoreVertical } from "react-icons/fi";

const PopoverSubMenuComponent: React.FC = () => {
  return (
    <Popover>
      <Tooltip hasArrow label="Ações" shouldWrapChildren marginTop="3">
        <PopoverTrigger>
          <Button backgroundColor="transparent" _hover={{ backgroundColor: "gray.900" }}>
            <FiMoreVertical fontSize="24" color="white" />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent backgroundColor="gray.800" width="fit-content">
        <PopoverBody>
          <HStack>
            <Tooltip hasArrow label="Detalhes">
              <IconButton
                aria-label="more-details-transaction"
                icon={<FiEye fontSize="24" color="white" />}
                backgroundColor="blue.500"
                colorScheme="blue"
              />
            </Tooltip>
            <Tooltip hasArrow label="Editar">
              <IconButton
                aria-label="edit-transaction"
                icon={<FiEdit fontSize="24" color="white" />}
                backgroundColor="green.500"
                colorScheme="green"
              />
            </Tooltip>
            <Tooltip hasArrow label="Excluir">
              <IconButton
                aria-label="delete-transaction"
                icon={<FiTrash fontSize="24" color="white" />}
                backgroundColor="red.500"
                colorScheme="red"
              />
            </Tooltip>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverSubMenuComponent;
