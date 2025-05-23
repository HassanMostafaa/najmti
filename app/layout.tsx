import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/global.css";
import "../styles/tailwindConfigs.css";
import { LayoutComponent } from "@/components/base-components/layout-component/LayoutComponent";
import Image from "next/image";

const geistSans = Nunito({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "NAJMTI",
  description: "App created by Hassan for my lovely wife",
  icons: {
    icon: "/assets/logo-square-fav.png",
    shortcut: "/assets/logo-square-fav.png",
    apple: "/assets/logo-square-fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
