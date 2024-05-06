"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getAllCourts, viewCase, getActs, getParties } from '@/hooks/useLegalDataContract'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PastHearings from '@/components/PastHearings'
import PublicDocuments from '@/components/PublicDocuments'
import CaseNumberSearch from '@/components/CaseNumberSearch'
import Loader from '@/components/Loader'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [caseData, setCaseData] = useState<any>({exists:null})
  const [court, setCourt] = useState<any>([])
  const [acts, setActs] = useState<any>([])
  const [parties, setParties] = useState([])
  const [searchResult, setsearchResult] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async(cnr:string) => {
    setCNR(cnr)
    setIsLoading(true)
    try {
      setCaseData({exists:false})
      const data = await viewCase(cnr)
      setCaseData({...data,['exists']:true})

      const allCourts = await getAllCourts()
      setCourt(allCourts.filter((item:any) => item.owner===data.owner)[0])

      const p = await getParties(cnr)
      setParties(p)

      const violatedActs = await getActs(cnr)
      setActs(violatedActs)
    } catch (error:any) {
      console.error(error)
    }
    setIsLoading(false)
  } 

  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  
  useEffect(() => {
    if(searchResult.exists){
      handleSearch(searchResult.cnr)
    }
  },[searchResult])

  return (
    <>
    <PageTitle>Search by CNR Number</PageTitle>
    
    <CaseNumberSearch setCaseData={setsearchResult}/>

    <nav className="flex gap-2 my-4">
      <Link href='?page=case-details'>
        <Button variant='secondary' size='sm'>Case Details</Button>
      </Link>
      <Link href='?page=case-history'>
        <Button variant='secondary' size='sm'>Case History</Button>
      </Link>
      <Link href='?page=documents'>
        <Button variant='secondary' size='sm'>Documents</Button>
      </Link>
    </nav>
    
    {
      isLoading? (
        <div className="mt-3"><Loader/></div>
      ) : (
          caseData.exists && page==="case-history" ? (
            <>
              <h1 className='text-[20px] font-medium'>{court.name} - {court.court_type}</h1>
              <PastHearings CNR={CNR}/>
            </>
          ) : caseData.exists && page==="documents" ? (
            <>
            <PublicDocuments CNR={CNR} types={["Interim Orders","Final Orders","Judgements","misc"]}/>
            </>
          ) : (
            <>
            {
              caseData.exists &&
              <main className=''>
                      <h1 className='text-[20px] font-medium'>{court.name} - {court.court_type}</h1>
                    {/* Case Details */}
                    <div className="">
                      <h2 className='font-medium text-blue-600 my-2'>Case Details</h2>
        
                      <div className="rounded-[16px] border-2 border-input grid grid-cols-[1fr_3fr] text-sm">
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Case Type</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.case_type}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Filing Number</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{Number(caseData.filing_no._hex)}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Filing Date</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.filing_date}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Registration Number</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{Number(caseData.reg_no._hex)}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Registration Date</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.reg_date}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold'>CNR Number</b>
                        <p className='p-2 pl-4 border-input text-blue-600 text-lg font-medium'>{caseData.cnr}<br/><i className='text-primary text-sm font-normal'>(Note the CNR number for future reference)</i></p>
                      </div>
                    </div>
        
                    {/* Case Status */}
                    <div className="mt-5">
                      <h2 className='font-medium text-blue-600 my-2'>Case Status</h2>
        
                      <div className="rounded-[16px] border-2 border-input grid grid-cols-[1fr_3fr] text-sm">
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>First Hearing Date</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.first_hearing}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Next Hearing Date</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.next_hearing}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Status</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.stage}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Court Number</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.court_no}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold'>Judge</b>
                        <p className='p-2 pl-4'>{caseData.judge}</p>
                      </div>
                    </div>
        
                    {/* Petitioner */}
                    <div className="mt-5">
                      <h2 className='font-medium text-blue-600 my-2'>Petitioner/s</h2>
                      <div className="rounded-[16px] border-2 border-input p-2 pl-4">
                        {
                          parties.filter((i:any) => i.party==="pet").map((item:any,index:number) => (
                            <div className="text-sm" key={index}>
                              <p className='font-semibold'>{index+1}) {item.name}</p>
                              <i>Advocate: {item.lead_adv}</i>
                            </div>
                          ))
                        }
                      </div>
                    </div>
        
                    {/* Respondent */}
                    <div className="mt-5">
                      <h2 className='font-medium text-blue-600 my-2'>Respondent/s</h2>
                      <div className="rounded-[16px] border-2 border-input p-2 pl-4">
                        {
                          parties.filter((i:any) => i.party==="res").map((item:any,index:number) => (
                            <div className="text-sm" key={index}>
                              <p className='font-semibold'>{index+1}) {item.name}</p>
                              <i>Advocate: {item.lead_adv}</i>
                            </div>
                          ))
                        }
                      </div>
                    </div>
        
                    {/* FIR Details */}
                    <div className="mt-5">
                      <h2 className='font-medium text-blue-600 my-2'>FIR Details</h2>
        
                      <div className="rounded-[16px] border-2 border-input grid grid-cols-[1fr_3fr] text-sm">
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Police Station</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.police_station}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>FIR Number</b>
                        <p className='p-2 pl-4 border-b-2 border-input'>{caseData.fir_no}</p>
        
                        <b className='border-r-2 border-input pl-4 p-2 font-semibold'>Year</b>
                        <p className='p-2 pl-4 '>{caseData.year}</p>
                      </div>
                    </div>
        
                    {/* Acts in violation */}
                    <div className="mt-5">
                      <h2 className='font-medium text-blue-600 my-2'>Acts in violation</h2>
        
                        {
                          acts.length==0 && <p>No violation registered</p>
                        }
                      {
                        acts.length!=0 &&
                        <div className="rounded-[16px] border-2 border-input  text-sm overflow-hidden">
                        {
                          acts.map((item:any,index:number) => (
                            <div key={index} className='grid grid-cols-[1fr_3fr]'>
                            <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>{item.name}</p>
                            <p className='p-2 pl-4 border-b-2 border-input'>{item.section}</p>
                            </div>
                          ))
                        }
                      </div>}
                    </div>
              </main>
            }
            </>
          )
      )
    }
    
    
    </>
  )
}

export default Page