"use client"
import React, { useEffect, useState } from 'react'
import { useFileTransferContext } from '@/hooks/FileTransferContext'
import { useContract, useContractRead } from '@thirdweb-dev/react'


const page = () => {
  const {getFiles} = useFileTransferContext()
  // const [files, setFiles] = useState([])
  // const { contract } = useContract("0x17a7F3A1Dd257d1f5e84826aB83d9Be5c3e481b6");
    
  // const func = async() => {
    // const { data, isLoading } = useContractRead(contract, "viewOwnedFiles", [])
    // console.log(data)
  // }

  // useEffect(() => {
  //   getFiles()
  // },[])



  //   console.log(contract)

  return (
    <div>
      page
      <button onClick={getFiles}>click me</button>
    </div>
  )
}


export default page