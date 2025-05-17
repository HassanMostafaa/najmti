import React, { FunctionComponent, PropsWithChildren } from "react";
import { HeaderNavigation } from "../header-navigation/HeaderNavigation";
import { FooterNavigation } from "../footer-navigation/FooterNavigation";

export const LayoutComponent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation />
      <div className="self-start w-full flex-1">{children}</div>
      <FooterNavigation />
    </div>
  );
};
