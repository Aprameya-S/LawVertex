import { getAllCourts, getParties, viewCase } from '@/hooks/useLegalDataContract'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Card } from './ui/card'
import Loader from './Loader'

interface PropType{
  CNR:string
}
const CaseCard = ({CNR}:PropType) => {
  const [caseData, setCaseData] = useState<any>({exists:null})
  const [court, setCourt] = useState<any>([])
  const [parties, setParties] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const getData = async() => {
    if(!CNR)return
    setIsLoading(true)
    try {
      setCaseData({...caseData,['exists']:false})
      const data = await viewCase(CNR)
      setCaseData({...data,['exists']:true})
      
      const allCourts = await getAllCourts()
      setCourt(allCourts.filter((item:any) => item.owner===data.owner)[0])
      
      const p = await getParties(CNR)
      setParties(p)
      setIsLoading(false)
    } catch (error:any) {
      console.log(error)
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    getData()
  },[CNR])

  if(isLoading)return(<div className="mt-4"><Loader/></div>)

  if(caseData.exists) return (
    <div className='bg-input dark:bg-secondary rounded-[15px] p-[20px] mt-4'>
      <span className='text-sm border border-blue-600 bg-blue-200 dark:bg-[#18316b] px-[10px] rounded-full scale-75 flex w-fit font-medium relative left-[-8px]'>
        {caseData.stage}
      </span>
      {
        (parties.filter((i:any) => i.party==="pet").length!=0 && parties.filter((i:any) => i.party==="res").length!=0) && 
        <h1 className='font-medium text-[20px]'>
        {parties.filter((i:any) => i.party==="pet")[0].name} vs {parties.filter((i:any) => i.party==="res")[0].name}
          <span className='text-sm'> ({caseData.year})</span>
        </h1>
      }
      <h2>{court.name}, {court.location}</h2>
      <h2 className='text-sm font-medium'>CNR: {CNR}</h2>
      
    </div>
  )
  else if(CNR!="") return (
    <p className='text-red-600 font-medium flex items-center mt-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      CNR does not exist
    </p>
  )
  else return(<></>)
}

export default CaseCard