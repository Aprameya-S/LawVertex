"use client"
import React from 'react'
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThirdwebProvider } from "@/components/ThirdwebProvider";
import { Sepolia } from "@thirdweb-dev/chains"


const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThirdwebProvider
      clientId={'b75d97dda9827edd7e665521bd610b09'}
      activeChain={Sepolia}
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