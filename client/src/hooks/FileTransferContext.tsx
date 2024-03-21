import React, { useContext, createContext} from 'react';
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';


const FileTransferContext = createContext({});


export const FileTransferContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {  
  // console.error = function(){}
  const { contract } = useContract("0x8cD1d671De6Bc091f5fbe0a5904610d8F98310d2");
  // const { data, isLoading } = useContractData(contract, "getTodo");

  const userAddress = useAddress()
  console.log(userAddress)

  // const  getAllFilesFromContract = async () => {
  //   try{
  //     let fileList = await contract.call("viewOwnedFiles")
  //     console.log(fileList)
  //     // setFiles(fileList);
  //   }catch (error){
  //     console.error(error)
  //   }
  // }

  const { mutateAsync: addFile, isLoading } = useContractWrite(contract, "addFile")

  const getFiles = async() => {
    try{
      // const files = await contract?.call("viewRecievedFiles",[])
      // .then((res) => {
      //   console.log(res)
      // })
      const { data, isLoading, error } = useContractRead(contract, "viewOwnedFiles", [])
      // const data=await addFile({args:["test2","desc","123","hash",false,false]})
      console.log(data)
    } catch(error){
      console.error(error)
    }
  }
  getFiles()

  // console.log(userAddress)

  return (
    <FileTransferContext.Provider
      value={{
        contract,
        userAddress,
        getFiles
        // getAllFilesFromContract
      }}
    >
      {children}
    </FileTransferContext.Provider>
  )
}


export const useFileTransferContext = () => useContext(FileTransferContext);