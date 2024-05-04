import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllCases, getAllCourts } from '@/hooks/useLegalDataContract'
import { StatesAndUTs, Districts } from '@/lib/legalData'
import React, { useEffect, useState } from 'react'
import { CaseTypes } from '@/lib/legalData'

interface PropTypes{
  setCaseData:React.SetStateAction<any>
}
const CaseNumberSearch = (props:PropTypes) => {
  const [state, setState] = useState<string>("")
  const [district, setDistrict] = useState("")
  const [court, setCourt] = useState<any>({exists:false})
  const [districtCourts, setDistrictCourts] = useState([])
  const [cases, setCases] = useState<Array<any>>([])

  const getDistrictCourts = async() => {
    if(state && district) {
      var data:any = await getAllCourts()
      data=data.filter((i:any) => i.location==state+"-"+district)
      setDistrictCourts(data)
    }
  }

  const getCases = async() => {
    var data:Array<any> = await getAllCases()
    setCases(data)
  }

  useEffect(() => {
    getDistrictCourts()
  },[district])

  useEffect(() => {
    getCases()
  },[court])

  const handleSearch = async(e:any) => {
    e.preventDefault()
    var data = cases.find((i:any) => (
      i.owner===court.owner &&
      i.case_type===e.target[1].value &&
      Number(i.reg_no._hex)===Number(e.target[2].value) &&
      i.reg_date.substr(0,4)===e.target[3].value
    ))
    props.setCaseData({exists:true,...data})
  }


  return (
    <>
    <form className='flex gap-3'>
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

      <Select onValueChange={(val) => setCourt(districtCourts.find((i:any)=>i.name===val))} disabled={district?false:true}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Court" />
        </SelectTrigger>
        <SelectContent>
          {           
            districtCourts?.map((item:any,index:number) => (
              <SelectItem value={item.name} key={index}>{item.name}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </form>

    {
      court.exists===undefined &&
      <>
      <p className='text-blue-600 font-medium mt-5 mb-3'>Search by Case Number</p>
      <form onSubmit={handleSearch} className='grid grid-cols-[1fr_1fr_150px_79px] gap-3 items-end'>
        <div className="">
          <Label>Case Type</Label>
          <Select>
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
        </div>

        <div className="">
          <Label>Registration Number</Label>
          <Input className='mb-3' type='number' required/>
        </div>

        <div className="">
          <Label>Year</Label>
          <Input className='mb-3' type='text' required/>
        </div>

        <Button type='submit' className='mb-3'>Search</Button>
      </form>
      </>
    }
    </>
  )
}

export default CaseNumberSearch