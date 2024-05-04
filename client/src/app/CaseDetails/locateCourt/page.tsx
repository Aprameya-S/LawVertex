"use client"
import React, { useEffect, useState } from 'react'
import { getAllCourts } from '@/hooks/useLegalDataContract'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatesAndUTs, Districts } from '@/lib/legalData'
import Link from 'next/link'
import PageTitle from '@/components/PageTitle'



const Page = () => {
  const [court, setCourt] = useState([])
  const [state, setState] = useState<string>("")
  const [district, setDistrict] = useState("")


  return (
    <>
    <PageTitle>Locate Court</PageTitle>
    <div className="grid grid-cols-2 gap-3">
      <Select onValueChange={(val) => {setState(val);setDistrict("")}}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {
            StatesAndUTs.map((item:any,index:number) => (
              <SelectItem value={item} key={index}>{item}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <Select onValueChange={(val) => setDistrict(val)} disabled={state?false:true}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select District" />
        </SelectTrigger>
        <SelectContent>
          {           
            Districts[state]?.map((item:any,index:number) => (
              <SelectItem value={item} key={index}>{item}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
    {
      (!state || !district) && <p className='text-red-600 font-medium mt-2'>Select state and district</p>
    }
    <div className="mt-2">
      {
        !(!state || !district) && <>
          <a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(`District court, ${district}, ${state}`)} target='_blank' className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[-3px] mr-2 lucide lucide-map-pinned"><path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835"/></svg>
            District Court Location
          </a>
        </>
      }
    </div>
    </>
  )
}

export default Page