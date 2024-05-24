"use client"
import CaseCard from '@/components/CaseCard'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateCase, viewCase } from '@/hooks/useLegalDataContract'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [caseData, setCaseData] = useState<any>({})
  const [CNR, setCNR] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSearch = async(e:any) => {
    e.preventDefault()
    setCNR(e.target[0].value)
    const data:any = await viewCase(e.target[0].value)
    setCaseData({
      'cnr':data.cnr,
      'next_hearing':data.next_hearing,
      'stage':data.stage,
      'court_no':data.court_no,
      'judge':data.judge
    })
    // console.log(data)
  }

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let data = await updateCase(caseData)
    } catch (error) {
      console.error(error)
      toast.error('Error!')
    }
    setIsLoading(false)
  }

  return (
    <>
    <PageTitle>Update Case</PageTitle>
    <form onSubmit={handleSearch} className="flex gap-3">
      <div className="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <Input type='text' placeholder='16-digit CNR Number' className='pl-8' required/>
      </div>
      <Button>Search</Button>
    </form>
    {
      caseData.cnr===CNR && <CaseCard CNR={caseData.cnr} />
    }
    {
      caseData.cnr===CNR &&
      <form className='mt-3' onSubmit={handleSubmit}>
        <Label>Next Hearing Date</Label>
        <Input value={caseData.next_hearing} type='date' required className='mb-3' onChange={(e:any) => setCaseData({...caseData,['next_hearing']:e.target.value})}/>

        <Label>Stage</Label>
        <Input value={caseData.stage} type='text' required className='mb-3' onChange={(e:any) => setCaseData({...caseData,['stage']:e.target.value})}/>

        <Label>Court Number</Label>
        <Input value={caseData.court_no} type='text' required className='mb-3' onChange={(e:any) => setCaseData({...caseData,['court_no']:e.target.value})}/>

        <Label>Judge</Label>
        <Input value={caseData.judge} type='text' required className='mb-4' onChange={(e:any) => setCaseData({...caseData,['judge']:e.target.value})}/>

        <Button disabled={isLoading} type='submit'>
          {
            isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          }
          Save changes
        </Button>
      </form>
    }
    {/* <form >
      <Label>Next Hearing</Label>
      <Input type='date' min={caseData.next_hearing} required/>
    </form> */}
    </>
  )
}

export default Page