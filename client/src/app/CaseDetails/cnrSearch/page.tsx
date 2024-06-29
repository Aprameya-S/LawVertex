"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getAllCourts, viewCase, getActs, getParties } from '@/hooks/useLegalDataContract'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PastHearings from '@/components/PastHearings'
import { useRouter } from 'next/navigation';
import PublicDocuments from '@/components/PublicDocuments'
import { getAdvocates } from '@/hooks/useAdvocateContract'

const Page = () => {
  const [CNR, setCNR] = useState<any>("")
  const [caseData, setCaseData] = useState<any>({exists:null})
  const [court, setCourt] = useState<any>([])
  const [acts, setActs] = useState<any>([])
  const [parties, setParties] = useState([])
  const [advocates, setAdvocates] = useState([])
  
  const searchParams = useSearchParams()
  const router = useRouter();

  const getData = async(cnr:string) => {
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
  }

  const getAllAdvocates = async(cnr:string) => {
    let data = await getAdvocates(cnr)
    setAdvocates(data)
  }

  const handleSearch = async(e:any) => {
    e.preventDefault();
    setCNR(e.target[0].value)
    router.push(`?cnr=${e.target[0].value}`)
    getData(e.target[0].value)
    getAllAdvocates(e.target[0].value)
  } 

  const page = searchParams.get('page')
  
  useEffect(() => {
    const cnr = searchParams.get('cnr')
    if(cnr){
      setCNR(cnr)
      getData(cnr)
      getAllAdvocates(cnr)
    }
  },[])

  return (
    <>
    <PageTitle>Search by CNR Number</PageTitle>
    <form onSubmit={handleSearch} className="flex gap-3">
      <div className="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <Input type='text' placeholder='16-digit CNR Number' className='pl-8' required/>
      </div>
      <Button>Search</Button>
    </form>
    {!caseData.exists && <p className='text-red-600 font-medium mt-2'>CNR does not exist</p>}
    <nav className="flex gap-2 my-4">
        <Button onClick={(e:any) => router.push(`?cnr=${CNR}`+'&page=case-details')} variant='secondary' size='sm'>Case Details</Button>
        <Button onClick={(e:any) => router.push(`?cnr=${CNR}`+'&page=case-history')} variant='secondary' size='sm'>Case History</Button>
        <Button onClick={(e:any) => router.push(`?cnr=${CNR}`+'&page=documents')} variant='secondary' size='sm'>Documents</Button>
    </nav>
    {
      caseData.exists && page==="case-history" ? (
        <>
          <h1 className='text-[20px] font-medium'>
            {court.name} - {court.court_type}
          </h1>
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
              <h1 className='text-[20px] font-medium flex'>
                {court.name} - {court.court_type}
                <span className='text-sm border border-blue-600 bg-blue-200 dark:bg-[#18316b] flex items-center px-[10px] rounded-full gap-2 scale-75 '>
                  {caseData.stage}
                </span>
              </h1>
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
                      <i>Lead Advocate: {item.lead_adv}</i>
                    </div>
                  ))
                }

                {advocates.filter((i:any) => i.party==="Petitioner").length!=0 && <p className='font-semibold text-sm mt-2'>Advocates:</p>}
                {
                  advocates.filter((i:any) => i.party==="Petitioner").map((item:any,index:number) => (
                    <Link key={index} href={`/Lawyers/find/${item.adv_address}`} target='_blank' className='flex items-center text-blue-600 text-sm w-fit'>
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </Link>
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
                      <i>Lead Advocate: {item.lead_adv}</i>
                    </div>
                  ))
                }

                {advocates.filter((i:any) => i.party==="Respondent").length!=0 && <p className='font-semibold text-sm mt-2'>Advocates:</p>}
                {
                  advocates.filter((i:any) => i.party==="Respondent").map((item:any,index:number) => (
                    <Link key={index} href={`/Lawyers/find/${item.adv_address}`} target='_blank' className='flex items-center text-blue-600 text-sm w-fit'>
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </Link>
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
    }
    
    
    </>
  )
}

export default Page