"use client"

import { ConnectWallet } from "@thirdweb-dev/react"
import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes";


const ConnectWalletBtn = () => {
  const { systemTheme, theme, setTheme } = useTheme();
// console.log(systemTheme, theme, setTheme)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true))

  if(mounted)
  return (
    <ConnectWallet 
      theme={theme=="dark"?"dark":"light"}
      btnTitle={"Connect Wallet"}
      modalTitle={"LawVertex"}
      switchToActiveChain={true}
      modalSize={"wide"}
      welcomeScreen={{
        title:
          "Immutable Integrity, Infinite Access: Transforming Legal Records with Blockchain.",
      }}
      className="w-[180px]"
    />
  )
}

export default ConnectWalletBtn