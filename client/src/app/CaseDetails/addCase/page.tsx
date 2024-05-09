"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { addCase } from '@/hooks/useLegalDataContract'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CaseTypes } from '@/lib/legalData'


const Page = () => {
  const [caseForm, setCaseForm] = useState({})
  const [caseInfoForm, setCaseInfoForm] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    await addCase(caseForm,caseInfoForm)
    e.target.reset()
    setCaseForm({})
    setCaseInfoForm({})
    setIsLoading(false)
  }
  
  
  return (
    <>
      <PageTitle>Add New Case</PageTitle>
      <form onSubmit={handleSubmit}>
        {/* Case */}
        <div className="case">
        <Label>Case Type</Label>
        <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['case_type']:e.target.value})} className='mb-3' required/>
        <Select onValueChange={(val) => setCaseForm({...caseForm,['case_type']:val})} required>
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {           
                CaseTypes.map((item:string,index:number) => (
                  <SelectItem value={item} key={index}>{item}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="">
            <Label>Filing Number</Label>
            <Input type='number' onChange={(e:any) => setCaseForm({...caseForm,['filing_no']:e.target.value})} required/>
          </div>
          <div className="">
            <Label>Filing Date</Label>
            <Input type='date' onChange={(e:any) => setCaseForm({...caseForm,['filing_date']:e.target.value})} max={new Date().toISOString().slice(0, 10)} required/>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="">
            <Label>Registration Number</Label>
            <Input type='number' onChange={(e:any) => setCaseForm({...caseForm,['reg_no']:e.target.value})} required/>
          </div>
          <div className="">
            <Label>Registration Date</Label>
            <Input type='date' onChange={(e:any) => setCaseForm({...caseForm,['reg_date']:e.target.value})} max={new Date().toISOString().slice(0, 10)} required/>
          </div>
        </div>

        <Label>CNR Number</Label>
        <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['cnr']:e.target.value})} className='mb-3' required/>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="">
            <Label>First Hearing Date</Label>
            <Input type='date' onChange={(e:any) => setCaseForm({...caseForm,['first_hearing']:e.target.value})} min={new Date().toISOString().slice(0, 10)} required/>
          </div>
          <div className="">
            <Label>Next Hearing Date</Label>
            <Input type='date' onChange={(e:any) => setCaseForm({...caseForm,['next_hearing']:e.target.value})} min={new Date().toISOString().slice(0, 10)} required/>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="">
          <Label>Stage</Label>
          <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['stage']:e.target.value})} className='' required/>
          </div>
          <div className="">
            <Label>Court Number</Label>
            <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['court_no']:e.target.value})} className='' required/>
          </div>
        </div>
        
        <Label>Name of Presiding Judge</Label>
        <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['judge']:e.target.value})} className='mb-6' required/>
        </div>

        <div className="h-[1px] mt-2 bg-black dark:bg-white w-full"></div>

        {/* Case Info */}
        <div className="case_info mt-5">
          <div className="grid sm:grid-cols-2 mb-3 gap-3">
            <div className="">
              <Label>Petitioner Account Address</Label>
              <Input type='text' onChange={(e:any) => setCaseInfoForm({...caseInfoForm,['pet_address']:e.target.value})} required/>
            </div>
            <div className="">
              <Label>Respondent Account Address</Label>
              <Input type='text' onChange={(e:any) => setCaseInfoForm({...caseInfoForm,['res_address']:e.target.value})} required/>
            </div>
          </div>
        </div>

        <div className="case_info">
          <div className="grid sm:grid-cols-2 mb-3 gap-3">
            <div className="">
              <Label>Status</Label>
              <Input type='text' onChange={(e:any) => setCaseInfoForm({...caseInfoForm,['status']:e.target.value})} required/>
            </div>
            <div className="">
              <Label>Police Station Name</Label>
              <Input type='text' onChange={(e:any) => setCaseInfoForm({...caseInfoForm,['police_station']:e.target.value})} required/>
            </div>
          </div>
        </div>

        <Label>FIR Number</Label>
        <Input type='text' onChange={(e:any) => setCaseInfoForm({...caseInfoForm,['fir_no']:e.target.value})} className='mb-3' required/>
            
          
        <Button type='submit' disabled={isLoading}>
          {
            isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          }
          Submit
        </Button>

      </form>
    </>
  )
}

export default Page