"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getHistory,addAct, addHistory } from '@/hooks/useLegalDataContract'
import { toast } from 'react-toastify'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CaseCard from '@/components/CaseCard'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [history, setHistory] = useState<any>(undefined)
  const [newProceeding, setNewProceeding] = useState({
    judge:"",
    date:"",
    next_hearing_date:"",
    next_hearing_purpose:"",
    business:"",
    presentee:""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async(e:any) => {
    e.preventDefault()
    setCNR(e.target[0].value)
    const data = await getHistory(e.target[0].value)
    var parsedData:any = []
    data.forEach((i:any) => {
      parsedData.push({
        judge:i.judge,
        date:i.date,
        next_hearing_date:i.next_hearing_date,
        next_hearing_purpose:i.next_hearing_purpose,
        business:i.business,
        presentee:i.presentee
      })
    });
    setHistory(parsedData)
  }

  
  const handleSubmit = async(e:any) => {
    setIsLoading(true)
    try {
      e.preventDefault()
      await addHistory(CNR,[...history,newProceeding])
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
    e.target.reset();
    setIsLoading(false)
  }

  // console.log(history)

  
  return (
    <>
      <PageTitle>Add Proceedings</PageTitle>
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input type='text' placeholder='16-digit CNR Number' required/>
        <Button>Search</Button>
      </form>

      <CaseCard CNR={CNR}/>
      
      {
        history!==undefined && <form id='addProceedingForm' className='mt-5' onSubmit={handleSubmit}>
        
        <Label>Presiding Judge</Label>
        <Input type='text' onChange={(e) => setNewProceeding({...newProceeding,['judge']:e.target.value})} className='mb-3'/>

        <Label>Date of hearing</Label>
        <Input type='date' onChange={(e) => setNewProceeding({...newProceeding,['date']:e.target.value})} className='mb-3'/>

        <Label>Business</Label>
        <Textarea onChange={(e) => setNewProceeding({...newProceeding,['business']:e.target.value})} className='mb-3' />

        <Label>Presentee</Label>
        <Input type='text' onChange={(e) => setNewProceeding({...newProceeding,['presentee']:e.target.value})} className='mb-3'/>

        <Label>Date of next hearing</Label>
        <Input type='date' onChange={(e) => setNewProceeding({...newProceeding,['next_hearing_date']:e.target.value})} className='mb-3'/>

        <Label>Purpose of next hearing</Label>
        <Textarea onChange={(e) => setNewProceeding({...newProceeding,['next_hearing_purpose']:e.target.value})} className='mb-4' />
        
        <Button type='submit' className=' w-fit'>
        {
          isLoading ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        }
          Add
        </Button>
      </form>
      }
      
    </>
  )
}

export default Page