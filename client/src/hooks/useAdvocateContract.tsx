import { ethers } from "ethers";
import abi from '../lib/advocateContract.json'
import {toast} from  'react-toastify';


export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const legalDataContract = new ethers.Contract("0x0C9649C5D9849B34D19cCcAE9bcB242797514244" || "", abi.abi, signer);

  return legalDataContract;
};

export const getAdvocates = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getAdvocates(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}

export const getAdvocateCases = async(address:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getAdvocateCases("0x6314CFFC21Ade895DfDcAF3589dD5797e42B4905")
    console.log(data)
    return data
  } catch (error) {
    throw(error)
  }
}

export const addAdvocates = async(CNR:string,addresses:Array<any>,names:Array<any>,parties:Array<any>) => {
  try {
    console.log(addresses)
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addAdvocates(
      CNR,
      addresses,
      names,
      parties
    )
    // console.log(data)
    toast("Advocate/s updated")

  } catch (error) {
    throw(error)
  }
}