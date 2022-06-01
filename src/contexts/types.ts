// React Imports
import { ReactNode } from "react";

// Chakra Imports
import { UseDisclosureReturn } from "@chakra-ui/react";

export interface ContextDrawerProviderProps {
  children?: ReactNode;
}

export interface ContextDrawerValuesProps extends UseDisclosureReturn {}
