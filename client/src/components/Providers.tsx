"use client"
import React from 'react'
import { ThemeProvider } from "next-themes"
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Localhost } from "@thirdweb-dev/chains"
// import {}

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={Localhost}
    >
        <ThemeProvider
          attribute="class"
          defaultTheme='system'
          enableSystem
        >
          
          {children}
        </ThemeProvider>
    </ThirdwebProvider>
  )
}

export default Providers