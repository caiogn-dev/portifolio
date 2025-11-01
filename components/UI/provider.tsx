"use client";

import * as React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: React.PropsWithChildren) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
