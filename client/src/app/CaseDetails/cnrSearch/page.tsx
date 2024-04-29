"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getAllCourts, viewCase, getActs } from '@/hooks/useLegalDataContract'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [caseData, setCaseData] = useState<any>({exists:null})
  const [court, setCourt] = useState<any>([])
  const [acts, setActs] = useState<any>([])

  const handleSearch = async(e:any) => {
    e.preventDefault();
    setCaseData({...caseData,['exists']:false})
    const data = await viewCase(CNR)
    setCaseData({...data,['exists']:true})

    const allCourts = await getAllCourts()
    setCourt(allCourts.filter((item:any) => item.owner===data.owner)[0])

    const violatedActs = await getActs(CNR)
    setActs(violatedActs)
  } 

  console.log(caseData,court,acts)

  if(CNR!=="" && caseData.exists==false) return (
    <><h1>Not Found</h1></>
  )


  return (
    <>
    <PageTitle>Search by CNR Number</PageTitle>
    <form onSubmit={handleSearch} className="flex gap-3">
      <Input type='text' onChange={(e) => setCNR(e.target.value)} placeholder='16-digit CNR Number' required/>
      <Button>Search</Button>
    </form>
    <nav className="flex gap-2 mt-4">
      <Button variant='secondary' size='sm'>Case Details</Button>
      <Button variant='secondary' size='sm'>More Info</Button>
      <Button variant='secondary' size='sm'>Documents</Button>
    </nav>
    {
      court.length!=0 &&
      <main className='mt-4'>
          <h1 className='text-[24px] font-medium'>{court.name} - {court.court_type}</h1>
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

          <div className="rounded-[16px] border-2 border-input grid grid-cols-[1fr_3fr] text-sm overflow-hidden">
            {
              acts.map((item:any,index:number) => (
                <>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>{item.name}</p>
                <p className='p-2 pl-4 border-b-2 border-input'>{item.section}</p>
                </>
              ))
            }
          </div>
        </div>
      </main>
    }
    
    </>
  )
}

export default Page