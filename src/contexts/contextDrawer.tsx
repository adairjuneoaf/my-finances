// Imports React
import { createContext, useEffect } from "react";

// Imports Next
import { useRouter } from "next/router";

// Chakra Imports
import { useDisclosure } from "@chakra-ui/react";

// Typings[Typescript]
import { ContextDrawerProviderProps, ContextDrawerValuesProps } from "./types";

const ContextDrawer = createContext({} as ContextDrawerValuesProps);

const ContextDrawerProvider = ({ children }: ContextDrawerProviderProps) => {
  const disclosure = useDisclosure();

  const { route } = useRouter();

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose();
    }
  }, [route]);

  return <ContextDrawer.Provider value={disclosure}>{children}</ContextDrawer.Provider>;
};

export { ContextDrawerProvider, ContextDrawer };
