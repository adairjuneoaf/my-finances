// Imports React
import { createContext, useEffect, useState } from "react";

// Imports Next
import { useRouter } from "next/router";

// Chakra Imports
import { useDisclosure } from "@chakra-ui/react";

// Typings[Typescript]
import { ContextDrawerProviderProps, ContextDrawerValuesProps } from "./types";
import { DrawerTypes } from "../@types/DrawerTypes";

const ContextDrawer = createContext({} as ContextDrawerValuesProps);

const ContextDrawerProvider = ({ children }: ContextDrawerProviderProps) => {
  const disclosure = useDisclosure();
  const [drawerType, setDrawerType] = useState<DrawerTypes>("default");
  const [transactionID, setTransactionID] = useState("");

  const { route } = useRouter();

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose();
    }
  }, [route]);

  const handleDrawerNewTransaction = () => {
    setDrawerType("new-transaction");
    disclosure.onOpen();
  };

  const handleDrawerEditTransaction = (transactionID: string) => {
    setTransactionID(transactionID);
    setDrawerType("edit-transaction");
    disclosure.onOpen();
  };

  return (
    <ContextDrawer.Provider
      value={{
        disclosure,
        drawerType,
        transactionID,
        handleDrawerNewTransaction,
        handleDrawerEditTransaction,
      }}
    >
      {children}
    </ContextDrawer.Provider>
  );
};

export { ContextDrawerProvider, ContextDrawer };
