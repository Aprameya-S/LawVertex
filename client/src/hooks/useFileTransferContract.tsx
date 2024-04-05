import { ethers } from "ethers";
import abi from '../lib/fileTransferContract.json'
import {toast} from  'react-toastify';
import { useState, useLayoutEffect } from "react";



export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const fileTransferContract = new ethers.Contract("0x8e1ba81a4e1828cA895ec3F3d9c7f5e40EF8b3C9", abi.abi, signer);

  return fileTransferContract;
};

export const viewOwnedFiles = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewOwnedFiles()
    // console.log(data)
    data = data.filter((item:any) => item['copyOf']==="")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getOwnedFile = async(publicid:string) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewOwnedFile(publicid)
    
    return data
  } catch (error) {
    console.log(error)
  }
}

export const addFile = async(form:any) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.addFile(
      form.name, 
      form.desc,
      form.format,
      form.size,
      form.createAt, 
      form.publicid,
      form.cid,
      form.encrypted,
      form.searchable,
      form.canRequest,
      false
    )
    console.log(data)
    toast("Upload successful!")
    // return data
  } catch (error) {
    throw(error)
  }
}

export const deleteFile = async(publicid:string) => {
  try {
  
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.deleteFile(publicid)
    // return data
  } catch (error) {
    throw(error)
  }
}

export const grantAccess = async(form:any) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.grantAccess(
      form.publicid,
      form.cid,
      form.receivingUserAddress, 
      form.ogpublicid,
      form.viewOnly
    )
    console.log(data)
    toast("Access granted")
    // return data
  } catch (error) {
    throw(error)
  }
}

export const revokeAccess = async(form:any) => {
  try {
    // await connectWallet()
    console.log(form)
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.revokeAccess(
      form.publicid,
      form.userAddress
    )
    console.log(data)
    toast("Access revoked")
    // return data
  } catch (error) {
    throw(error)
  }
}

export const viewAccessList = async(publicid:string) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.viewAccessList(publicid)
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}


export const getAllFilesAccessList = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewOwnedFiles()
    data = data.filter((item:any) => item['copyOf']==="")
    var newdata:any = []
    data.forEach(async(file:any) => {
      var accessList = await viewAccessList(file.publicid)
      newdata.push({...file,['accesslist'] : accessList})
    });
    // console.log(newdata)
    
    return newdata
  } catch (error) {
    console.log(error)
  }
}

export const viewRecievedFiles = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewRecievedFiles()
    data = data.filter((item:any) => item['copyOf']!=="")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const viewFile = async(publicid:string) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewFile(publicid)
    
    return data
  } catch (error) {
    console.log(error)
  }
}