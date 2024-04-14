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
      modalTitleIconUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAABHNCSVQICAgIfAhkiAAABSlJREFUWEfFlg9MVVUcx3/nvvsekThE/FOG/H+zkNotk/hjgQlZtizXjLXlRi6yhOafzBl/gimYqxUrRxJqBs6eosG0WQ1JHplTaAPfDA0C3lZQW8wACeL9u7ffuY/3j3vgPhqsu7d3zj33nN/5vO/39zv3ET5bqiWStAH+v2tQy5E4EpTjGAAJ5s0KB/EvKifZ9GThdqsgEc6IS4L9WzY+y89N1GISAlX9H/BZcrh78qwCiGT6MGq7qD4nVX0H+Cw6zf27IoutAnHA7ML4qlhl3quTIXxA6I0eYTgygzCT2CehHZ2FHggFCB2IK6UwElOZGUqLqut5AW4l3IpcbB/7TaOBMK2GAK8BoO0ftwFKv5Ng1KZq8rQmpMYQyEkmWKQAEn7RVhRBHLE44kjjjTGR1xCiG4fQ8k6Y329LsLdBnDGY1GgCrydxMrgLwtUfGLKnk6YblkytFgxaDRAKgK0MQoH6UJmiCw4YtU7rhysmp0ZzsBUhKIBzc0lWg16jFql7eZguVrb9SpclU6chThjeCYP3slW9QwCF9bb/rIwMkahx2+GtyD8WsXvZEl2sT7K2mC2Zc7QUhiAMqoLlI6uDYD/3i1By0T5tGBniEQxCVRi3RO6LACNWsVt/lxPCB4TeXPsVYQI4A6qBNjktwg8MWyS0SYL9Tf7DpCFETiLvyQc5OZ2WjI6J3VGLPBAKEDrQ0WfJDAzQGHS80yabXQKLHYDHPOtFmBKjOsyqCA7eSOLlNbIS45LQdmRM6g5fwLuVcCsS+rzhxK1h+9OuAdo+mxyhrdyRfGcAggyOioDvAwyK6lCYYUzgBitYHOxTJSWcgyyBAwfuStfPDSSAS2VlbvYOi4m5X2EEz3WHjgx9tGXlCqJ58vigQ5QUL7xnkiLg0LYksNicSesCwVKHC9cH4GTXHEXOUIiXH9Tg2SDJIA7MBREJggM56O3/GxJyz3kzuPsxS4P15Fh9p/DKh81GFsx94SFgyF8DIXN1ssxUEQpC+x1/2uDdHzyHHrVjM0LIm3uB2LFfd8kMBZ81MyFy1y8zHcxJWCnrW3m+U3jt42Yj0iuUiYsIgZpChAnS+YD82NEPixcvgNImGwh3ox3jEBNBvrzUA3lH2BCb18aYju5MTiOEDLqNlmEOIgzDJgpTW5QO84K0bkXaum7BQ7GhsgKYz9iiHdj3BjnzvRn2HL7KVCL7Kb2pcnuiDKGomrK6dmFnRasRTz6FMssjQ6CuOB3me9k0NGIHzGgmyGmE2F3JhnhpTbTp+O4UNwSzfMsRJncSmHiEObcvA+ajMjRfrt7shxX6hQqQ0009sOtTNsSmjGhT9S5fCCYIHSw90S4UVLOViY8Kga9LMjBntEDtiY8M9QE5ZTTDmxVXmHa8kBZuOvV2qo8S7nOEuQIHy2rQpiMIA0qb7keYb/dnoCoEdLzHmpONZthxiA2x8bFwU00+G2JSRVxwxcfahGLDT0Y8jhQ58wDC1B94Alp/+QsevncRGBp7YFs5G2JDylJT7TtpTCVUFXFNoDblV7UyYagyr67Tg13kUAl2TqxPDjOdLVo9JYSqIi6YtypbhPfPdDBhJrOWjm/BEq3wKtGp5vr9N3Qqm1gbeB9WUwH4bY13kK3lLcInZ9WV2YTnRPWEc0INxm9FPDa1oU3sBKZzXlwdZfpizyrVnJgINm0QGiC77LJw+JseRc5sfBRLtGDyEp2RHJkYZKJN/pTorIDQoFnvXRY+b+gxrktYcu38vsefc73A1PKB9fxfLPhElvgy9ToAAAAASUVORK5CYII="
    />
  )
}

export default ConnectWalletBtn