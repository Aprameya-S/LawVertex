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

  const handleSubmit = (e:any) => {
    e.preventDefault()
    let data = {...form,['location']:form.state+'-'+form.district}
    addCourt(data)
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
            StatesAndUTs.map((item,index) => (
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

        <Button type='submit' className='w-full sm:w-fit'>Submit</Button>
      </form>
    </>
  )
}

export default Page