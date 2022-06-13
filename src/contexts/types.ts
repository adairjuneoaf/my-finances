// React Imports
import { ReactNode } from "react";

// Chakra Imports
import { UseDisclosureReturn } from "@chakra-ui/react";

// Typings[TypeScript]
import { DrawerTypes } from "../@types/DrawerTypes";

export interface ContextDrawerProviderProps {
  children?: ReactNode;
}

export interface ContextDrawerValuesProps {
  disclosure: UseDisclosureReturn;
  drawerType: DrawerTypes;
  transactionID: string;
  handleDrawerNewTransaction: () => void;
  handleDrawerEditTransaction: (transactionID: string) => void;
}
