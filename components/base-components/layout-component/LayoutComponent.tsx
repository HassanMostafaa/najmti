"use client";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { HeaderNavigation } from "../header-navigation/HeaderNavigation";
import { FooterNavigation } from "../footer-navigation/FooterNavigation";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/services/query-client";

export const LayoutComponent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation />
      <QueryClientProvider client={queryClient}>
        <div className="self-start w-full flex-1">{children}</div>
      </QueryClientProvider>
      <FooterNavigation />
    </div>
  );
};
