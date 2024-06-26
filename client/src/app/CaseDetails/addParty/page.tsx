"use client"
import CaseCard from '@/components/CaseCard'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addParty, getParties } from '@/hooks/useLegalDataContract'
import React, { useState } from 'react'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [petitioners, setPetitioners] = useState<any>([])
  const [respondents, setRespondents] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async(e:any) => {
    e.preventDefault()
    const data:any = await getParties(e.target[0].value)
    setCNR(e.target[0].value)
    console.log(data)
  }

  const handleAddPetitioner = async(e:any) => {
    e.preventDefault()
    setIsLoading(true)
    await addParty({cnr:CNR,party:"pet",name:e.target[0].value,adv:e.target[1].value,location:e.target[2].value})
    e.target.reset()
    setIsLoading(false)
  }

  const handleAddRespondent = async(e:any) => {
    e.preventDefault()
    setIsLoading(true)
    await addParty({cnr:CNR,party:"res",name:e.target[0].value,adv:e.target[1].value,location:e.target[2].value})
    e.target.reset()
    setIsLoading(false)
  }

  return (
    <>
    <PageTitle>Add / Update Parties</PageTitle>
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <Input type='text' placeholder='16-digit CNR Number' className='pl-8' required/>
        </div>

        <Button type='submit'>Search</Button>
      </form>
      <CaseCard CNR={CNR}/>
      {
      CNR!=="" && 
      <main>
        <h2 className='font-medium text-blue-600 mt-4'>Petitioner</h2>
        <form onSubmit={handleAddPetitioner}>
          <Label>Petitioner Name</Label>
          <Input type='text' required className='mb-3'></Input>

          <Label>Petitioner&#39;s Lead Advocate Name</Label>
          <Input type='text' required className='mb-3'></Input>

          <Label>Mailing Address</Label>
          <Input type='text' required className='mb-4'></Input>
          <Button type='submit' disabled={isLoading}>
          {
            isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          }
            Submit
          </Button>
        </form>

        <h2 className='font-medium text-blue-600 mt-4'>Respondent</h2>
        <form onSubmit={handleAddRespondent}>
          <Label>Respondent Name</Label>
          <Input type='text' required className='mb-3'></Input>

          <Label>Respondent&#39;s Lead Advocate Name</Label>
          <Input type='text' required className='mb-3'></Input>

          <Label>Mailing Address</Label>
          <Input type='text' required className='mb-4'></Input>
          <Button type='submit' disabled={isLoading}>
          {
            isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          }
            Submit
          </Button>
        </form>
      </main>
      }
    </>
  )
}

export default Page