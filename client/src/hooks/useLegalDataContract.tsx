import { ethers } from "ethers";
import abi from '../lib/legalDataContract.json'
import {toast} from  'react-toastify';



export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const legalDataContract = new ethers.Contract("0x3b4e7fdbB231e3e8447E452a600AD3cD87E8aB80" || "", abi.abi, signer);

  return legalDataContract;
};

export const addCourt = async(form:any) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addCourt(
      form.courtAddress,
      form.name,
      form.location,
      form.tel
    )
    // console.log(data)
    toast("Court created!")

  } catch (error) {
    throw(error)
  }
}

export const getAllCourts = async() => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getAllCourts()
    return data
  } catch (error) {
    throw(error)
  }
}

export const viewCase = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.viewCase(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}

