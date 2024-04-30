import { ethers } from "ethers";
import abi from '../lib/legalDataContract.json'
import {toast} from  'react-toastify';


export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const legalDataContract = new ethers.Contract("0x2D7acd929c34089Ff97d05B96d5Dd9257A7D1Fdb" || "", abi.abi, signer);

  return legalDataContract;
};

export const addCourt = async(form:any) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addCourt(
      form.courtAddress,
      form.courtType,
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
    const info = await legalDataContract.infos(cnr)
    const data = await legalDataContract.viewCase(cnr)
    return {...data,...info}
  } catch (error:any) {
    throw(error)
  }
}

export const addCase = async(caseForm:any, caseInfoForm:any) => {
  try {
    const legalDataContract = createEthereumContract()
    console.log(caseForm,caseInfoForm)
    const data = await legalDataContract.addCase(
      caseForm.case_type,
      caseForm.filing_no,
      caseForm.filing_date,
      caseForm.reg_no,
      caseForm.reg_date,
      caseForm.cnr,
      caseForm.first_hearing,
      caseForm.next_hearing,
      caseForm.stage,
      caseForm.court_no,
      caseForm.judge
    )
    
    const info = await legalDataContract.addCaseInfo(
      caseForm.cnr,
      caseInfoForm.pet_address,
      caseInfoForm.res_address,
      caseInfoForm.status,
      caseInfoForm.police_station,
      caseInfoForm.fir_no,
      caseForm.filing_date.substring(0,4)
    )
    // console.log(data)
    toast("Court created!")

  } catch (error) {
    throw(error)
  }
}


export const getActs = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getActs(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}

export const addAct = async(CNR:string,acts:Array<any>) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addAct(
      CNR,
      acts
    )
    // console.log(data)
    toast("Act/s updated")

  } catch (error) {
    throw(error)
  }
}

export const getHistory = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getHistory(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}

export const addHistory = async(CNR:string,history:Array<any>) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addHistory(
      CNR,
      history
    )
    // console.log(data)
    toast("Hearings updated")

  } catch (error) {
    throw(error)
  }
}
