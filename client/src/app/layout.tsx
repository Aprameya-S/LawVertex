import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardNav from "@/components/DashboardNav";
import "./index.scss"
const inter = Inter({ subsets: ["latin"] });
import Providers from "./providers"; 

export const metadata: Metadata = {
  title: "LawVertex",
  description: "Immutable Integrity, Infinite Access: Transforming Legal Records with Blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
          <body className={`${inter.className} bg-[#f5f6f8] dark:bg-[#0e0e10]`}>
            <Providers>
              <link rel="icon" href="/logo.svg" sizes="any" />
              <DashboardNav>
                {children}
              </DashboardNav>
            </Providers>
          </body>
    </html>
  );
}
