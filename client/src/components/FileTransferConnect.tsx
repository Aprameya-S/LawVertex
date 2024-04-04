"use client"
import { ethers } from "ethers";
import {toast} from  'react-toastify';
import { useState, useLayoutEffect } from "react";
import Loader from "./Loader";
import ConnectWalletBtn from "./ConnectWalletBtn";


const FileTransferConnect = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const connect = async() => {
    setIsLoading(true)
    try {
      const { ethereum } = window;
      if (!ethereum) return toast("Please install MetaMask.");

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // let request = await provider.send("eth_requestAccounts", []);
      const accounts = await ethereum.request({method: 'eth_accounts'})
      .then((res:any) => {
        if(res)
          setAddress(res[0])
      })
      
      ethereum.on('accountsChanged', function (accounts:any) {
          setAddress(accounts[0])
          // console.log(account); // Print new address
      });

      setIsLoading(false)

      // window.location.reload();
    } catch (error:any) {
      if(error.code === 4100){
        toast.error("Contract call failure: This action requires a connected wallet to sign the transaction. Please connect your wallet and try again. ", error)      
      }
      else if(error.code === 4001){
        toast("Connection was terminated. Please try again")
      }
      else if(error.code === -32002){
        
      }
      else {
        toast(error.message);
      }
      throw(error)
    }
  }

  useLayoutEffect(() => {
    connect()
  },[])

  console.log(address)
  return (address) ? (
    <>
      {children}
    </>
  ) : (
    <>
      <div className="w-full h-[70vh] grid content-center justify-items-center transition-all">
        {
          isLoading ? <Loader /> : (
            <>
            <p className="transition-all mt-7 mb-2">Please connect your wallet to acces your vault</p>

            <div className="scale-75 transition-all">
              <ConnectWalletBtn />
            </div>
            </>
          )
        }
      </div>
    </>
    
  )
}

export default FileTransferConnect