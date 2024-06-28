"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getAdvocates,addAdvocates } from '@/hooks/useAdvocateContract'
import { toast } from 'react-toastify'
import CaseCard from '@/components/CaseCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [advocates, setAdvocates] = useState<any>(undefined)
  const [newAdvocate, setNewAdvocate] = useState({address:"",name:"",party:""})
  const [isLoading, setIsLoading] = useState(false)


  const handleSearch = async(e:any) => {
    e.preventDefault()
    setCNR(e.target[0].value)
    const data = await getAdvocates(e.target[0].value)
    console.log(data)

    let parsedData:any = {addresses:[],names:[],parties:[]}

    data.forEach((item:any) => {
      parsedData.addresses.push(item.adv_address)
      parsedData.names.push(item.name)
      parsedData.parties.push(item.party)
    });
    
    setAdvocates(parsedData)
  }

  const handleAddAdvocate = () => {
      if(newAdvocate.name==="" || newAdvocate.address==="" ||  newAdvocate.party===""){
        toast.error("Please complete advocate's info")
        return
      }
      setAdvocates({
        addresses:[...advocates.addresses,newAdvocate.address],
        names:[...advocates.names,newAdvocate.name],
        parties:[...advocates.parties,newAdvocate.party]
      })
      setNewAdvocate({address:"",name:"",party:""})
  }

  console.log(advocates)

  const handleSubmit = async(e:any) => {
    setIsLoading(true)
    try {
      e.preventDefault()
      await addAdvocates(CNR,advocates.addresses,advocates.names,advocates.parties)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
    
    setIsLoading(false)
  }

  // console.log(acts,newAct)

  
  return (
    <>
      <PageTitle>Add / Update Act Violation</PageTitle>
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <Input type='text' placeholder='16-digit CNR Number' className='pl-8' required/>
        </div>
        <Button>Search</Button>
      </form>

      <CaseCard CNR={CNR}/>
      
      {
        advocates!=undefined && <form className='mt-3 flex flex-col gap-3' onSubmit={handleSubmit}>
        {
          
          advocates.names.map((item:any,index:number) => (
            <div className="flex gap-3" key={index}>
              <Input type='text' value={advocates.addresses[index]} disabled required/>
              <Input type='text' value={advocates.names[index]} disabled required/>
              <Input type='text' value={advocates.parties[index]} disabled required/>
              <Button type='button' size='icon' className='w-[36px] flex-none bg-red-800 hover:bg-red-900 text-white' onClick={() => {setAdvocates({
                addresses:advocates.addresses.toSpliced(index,1),
                names:advocates.names.toSpliced(index,1),
                parties:advocates.parties.toSpliced(index,1),
              })}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </Button>
            </div>
          ))
        }
        {/* {
          acts.length==0 && <p className='text-red-600 font-medium'>No violated acts registered</p>
        } */}
        <div className="flex gap-3">
          <Input type='text' placeholder='Wallet Address' value={newAdvocate.address} onChange={(e) => setNewAdvocate({...newAdvocate,['address']:e.target.value})}/>
          <Input type='text' placeholder='Full Name' value={newAdvocate.name} onChange={(e) => setNewAdvocate({...newAdvocate,['name']:e.target.value})}/>
          <Select onValueChange={(val) => setNewAdvocate({...newAdvocate,['party']:val})}>
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Select Party" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Petitioner'>Petitioner</SelectItem>
              <SelectItem value='Respondent'>Respondent</SelectItem>
            </SelectContent>
          </Select>
          <Button type='button' size='icon' className='w-[36px] flex-none bg-blue-600 hover:bg-blue-700 text-white' onClick={handleAddAdvocate}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </Button>
        </div>
        <Button type='submit' className=' w-fit'>
        {
          isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
        }
          Save changes
        </Button>
      </form>
      }
      
    </>
  )
}

export default Page