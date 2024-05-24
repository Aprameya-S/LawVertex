import { ethers } from "ethers";
import abi from '../lib/legalDataContract.json'
import {toast} from  'react-toastify';


export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const legalDataContract = new ethers.Contract("0xB0D16A2a1063C3693f3ADAa24ECaD1c792588E0a" || "", abi.abi, signer);

  return legalDataContract;
};



