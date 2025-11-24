"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Toaster } from "sonner";

const queryClient = new QueryClient();
const WrapProviders = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-left" />
    </QueryClientProvider>
  );
};

export default WrapProviders;
