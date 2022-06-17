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
  const [isEditing, setIsEditing] = useState(false);
  const [drawerType, setDrawerType] = useState<DrawerTypes>("default");
  const [transactionID, setTransactionID] = useState<string | null>(null);
  const [isLoadingDataForEdit, setIsLoadingDataForEdit] = useState(false);

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

  const handleDrawerNewPaymentMethod = () => {
    setDrawerType("new-payment-method");
    disclosure.onOpen();
  };

  const handleDrawerNewCreditorDebtor = () => {
    setDrawerType("new-creditor-debtor");
    disclosure.onOpen();
  };

  const handleDrawerEditTransaction = (transactionID: string) => {
    setIsEditing(true);
    setIsLoadingDataForEdit(true);
    setTransactionID(transactionID);
    setDrawerType("edit-transaction");
    disclosure.onOpen();
  };

  const handleResetTransactionID = () => {
    setTransactionID(null);
    setIsEditing(false);
  };

  const handleIsLoadingDataForEdit = () => {
    setIsLoadingDataForEdit(false);
  };

  return (
    <ContextDrawer.Provider
      value={{
        isEditing,
        disclosure,
        drawerType,
        transactionID,
        isLoadingDataForEdit,
        handleResetTransactionID,
        handleIsLoadingDataForEdit,
        handleDrawerNewTransaction,
        handleDrawerEditTransaction,
        handleDrawerNewPaymentMethod,
        handleDrawerNewCreditorDebtor,
      }}
    >
      {children}
    </ContextDrawer.Provider>
  );
};

export { ContextDrawerProvider, ContextDrawer };
