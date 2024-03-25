import { ethers } from "ethers";
import abi from '../lib/contract.json'
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

    console.log(address);

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
  const fileTransferContract = new ethers.Contract("0x3921408DAA247Eb852FdA6385E17D7Aace895Edf", abi.abi, signer);

  return fileTransferContract;
};

export const viewOwnedFiles = async() => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.viewOwnedFiles()
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getOwnedFile = async(publicid:string) => {
  try {
    // await connectWallet()
    const fileTransferContract = createEthereumContract()
    const data = await fileTransferContract.viewOwnedFile(publicid)
    // console.log(data)
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
      form.size,
      form.createAt, 
      form.publicid,
      form.cid,
      form.searchable,
      form.canRequest
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
