"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { addCourt } from '@/hooks/useLegalDataContract'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Districts, StatesAndUTs } from '@/lib/legalData'


const Page = () => {
  const [form, setForm] = useState({
    courtAddress:"",
    courtType:"",
    name:"",
    state:"",
    district:"",
    tel:""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setIsLoading(true)
    let data = {...form,['location']:form.state+'-'+form.district}
    await addCourt(data)
    e.target.reset()
    setIsLoading(false)
  }

  return (
    <>
      <PageTitle>Add Court</PageTitle>
      <form onSubmit={handleSubmit}>
        <Label>Court Account Address</Label>
        <Input type='text' required className='mb-3' onChange={(e) => setForm({...form,['courtAddress']:e.target.value})}/>

        <Label>Type of Court</Label>
        <Input type='text' required className='mb-3' onChange={(e) => setForm({...form,['courtType']:e.target.value})}/>

        <Label>Court Complex Name</Label>
        <Input type='text' required className='mb-3' onChange={(e) => setForm({...form,['name']:e.target.value})}/>

        <Label>State</Label>
        <Select onValueChange={(val) => setForm({...form,['state']:val})} required>
        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {
            StatesAndUTs.map((item:any,index:number) => (
              <SelectItem value={item} key={index}>{item}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <Label>District</Label>
      <Select onValueChange={(val) => setForm({...form,['district']:val})} disabled={form.state?false:true} required>
        <SelectTrigger className="mb-3">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {           
            Districts[form.state]?.map((item:any,index:number) => (
              <SelectItem value={item} key={index}>{item}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>

        <Label>Telephone</Label>
        <Input type='phone' required className='mb-4' onChange={(e) => setForm({...form,['tel']:e.target.value})}/>

        <Button type='submit' className='w-full sm:w-fit' disabled={isLoading}>
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