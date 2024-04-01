import { ethers } from "ethers";
import abi from '../lib/fileTransferContract.json'
import {toast} from  'react-toastify';


export const connectWallet = async () => {
    try {
    const { ethereum } = window;
    if (!ethereum) return toast("Please install MetaMask.");

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    provider.on('accountsChanged', function (accounts) {
        account = accounts[0];
        console.log(address); // Print new address
    });

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    // console.log(address);

    // window.location.reload();
  } catch (error:any) {
    if(error.code === 4100){
      toast.error("Contract call failure: This action requires a connected wallet to sign the transaction. Please connect your wallet and try again. ", error)      
    }
    else if(error.code === 4001){
      toast("Connection was terminated. Please try again")
    }
    else {
      toast(error.message);
    }
    throw(error)
  }
};



export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const fileTransferContract = new ethers.Contract("0x5cC31794eAF40Aa7C383094Bd549d8b0fe483B3c", abi.abi, signer);

  return fileTransferContract;
};

export const viewOwnedFiles = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewOwnedFiles()
    data = data.filter((item:any) => item['copy']==false)
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

export const viewRecievedFiles = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    var data = await fileTransferContract.viewRecievedFiles()
    data = data.filter((item:any) => item['copy']==true)
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