"use client"
import React, { useEffect, useState } from 'react'
import { getAllCourts } from '@/hooks/useLegalDataContract'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatesAndUTs, Districts } from '@/lib/legalData'
import Link from 'next/link'



const Page = () => {

  const [court, setCourt] = useState([])
  const [state, setState] = useState<string>("")
  const [district, setDistrict] = useState("")


  return (
    <>
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
    {
      !(!state || !district) && <>
        <a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(`District court, ${district}, ${state}`)} target='_blank'>District Court Location</a>
      </>
    }
    </>
  )
}

export default Page