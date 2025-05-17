import React, { FunctionComponent, PropsWithChildren } from "react";
import { HeaderNavigation } from "../header-navigation/HeaderNavigation";
import { FooterNavigation } from "../footer-navigation/FooterNavigation";

export const LayoutComponent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen ">
      <HeaderNavigation />
      <span className="self-start">{children}</span>

      <FooterNavigation />
    </div>
  );
};
