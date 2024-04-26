"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { addCase } from '@/hooks/useLegalDataContract'


const Page = () => {
  const [caseForm, setCaseForm] = useState({})
  const [caseInfoForm, setCaseInfoForm] = useState({})

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    addCase(caseForm,caseInfoForm)
  }
  
  
  return (
    <>
      <PageTitle>Add New Case</PageTitle>
      <form onSubmit={handleSubmit}>
        {/* Case */}
        <div className="case">
        <Label>Case Type</Label>
        <Input type='text' onChange={(e:any) => setCaseForm({...caseForm,['case_type']:e.target.value})} className='mb-3' required/>

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
            
          
        <Button type='submit'>Submit</Button>

      </form>
    </>
  )
}

export default Page