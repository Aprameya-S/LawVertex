"use client"
import { ethers } from "ethers";
import {toast} from  'react-toastify';
import { useState, useLayoutEffect } from "react";
import Loader from "./Loader";
import ConnectWalletBtn from "./ConnectWalletBtn";
import { useRouter } from "next/navigation";

const FileTransferConnect = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [address, setAddress] = useState("")
  const [addressExists, setAddressExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { push } = useRouter();

  const connect = async() => {
    setIsLoading(true)
    try {
      const { ethereum } = window;
      if (!ethereum) return toast("Please install MetaMask.");

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      //uncomment below line to propmt metamask connection automatically
      // let request = await provider.send("eth_requestAccounts", []);
      const accounts = await ethereum.request({method: 'eth_accounts'})
      .then(async(res:any) => {
        // console.log(res)
        if(!res || res.length===0){
          return
        }
          setAddress(res[0])

        const response = await fetch('/api/vault/addressExists', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            address:res[0]
          })
        })
        const data = await response.json()
        .then((result) => {
          // console.log(result)
          setAddressExists(result.addressExists)
          if(!result.addressExists)
            push(`/Signup/vault/${res[0]}`)
        })
      })
      .then(() => {
        ethereum.on('accountsChanged', function (accounts:any) {
            setAddress(accounts[0])
            window.location.reload()
            // console.log(account); // Print new address
        });
  
        setIsLoading(false)
      })
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
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    connect()
  },[])



  // console.log(address)
  return (address) ? (
    
    <>
      {
        addressExists ? (
          <>
            {children}
          </>
        ) : (
          <div className="w-full h-[70vh] grid content-center justify-items-center transition-all">
            <Loader />
          </div>
        )
      }
    </>
  ) : (
    <>
      <div className="w-full h-[70vh] grid content-center justify-items-center transition-all">
        {
          isLoading ? <Loader /> : (
            <>
            <p className="transition-all mt-7 mb-2">Please connect your wallet to access your vault</p>

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