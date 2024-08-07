import { ethers } from "ethers";
import abi from '../lib/legalDataContract.json'
import {toast} from  'react-toastify';


export const createEthereumContract = () => {
  // const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/-OHVSCL0DxGaycEqcJqlTHyH1mPk4QTP');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const legalDataContract = new ethers.Contract("0xA1c9F69619d5b20411A5CCB9CaC52b8A065af181" || "", abi.abi, signer);

  return legalDataContract;
};

export const getRole = async() => {
  try {
    const legalDataContract = createEthereumContract()
    const { ethereum } = window;
    const accounts = await ethereum.request({method: 'eth_accounts'})
    const data = await legalDataContract.roles(accounts[0])
    console.log(data)
    return data
  } catch (error:any) {
    throw(error)
  }
}

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

export const getAllCases = async() => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getAllCases()
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
    // console.log(caseForm,caseInfoForm)
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
export const updateCase = async(caseData:any) => {
  try {
    const legalDataContract = createEthereumContract()
    // console.log(caseForm,caseInfoForm)
    const data = await legalDataContract.updateCase(
      caseData.cnr,
      caseData.next_hearing,
      caseData.stage,
      caseData.court_no,
      caseData.judge
    )
    
    toast("Update successful.")

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
    console.log(CNR,acts)
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

export const getParties = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.getParties(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}

export const addParty = async(form:any) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addParty(
      form.cnr,
      form.party,
      form.name,
      form.adv,
      form.location
    )
    // console.log(data)
    toast("Party added!")

  } catch (error) {
    throw(error)
  }
}

export const addPublicDocument = async(cnr:string,form:any,cid:string) => {
  // console.log(cnr,form,cid)
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.addPublicDocument(
      cnr,
      form.name,
      form.uploadedAt,
      cid,
      form.type
    )
    // console.log(data)
    toast("Document uploaded")

  } catch (error) {
    throw(error)
  }
}

export const viewPublicDocuments = async(cnr:string) => {
  try {
    const legalDataContract = createEthereumContract()
    const data = await legalDataContract.viewPublicDocuments(cnr)
    return data
  } catch (error) {
    throw(error)
  }
}


