"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { getActs,addAct } from '@/hooks/useLegalDataContract'
import { toast } from 'react-toastify'

const Page = () => {
  const [CNR, setCNR] = useState("")
  const [acts, setActs] = useState<any>(undefined)
  const [newAct, setNewAct] = useState({name:"",section:""})
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async(e:any) => {
    e.preventDefault()
    const data = await getActs(CNR)
    var parsedData:any = []
    data.forEach((i:any) => {
      parsedData.push({name:i.name,section:i.section})
    });
    setActs(parsedData)
  }

  const handleAddAct = () => {
      if(newAct.name==="" || newAct.section===""){
        toast.error("Please complete violated act info")
        return
      }
      setActs((prev:any) => [...prev,newAct])
      setNewAct({name:"",section:""})
  }

  const handleSubmit = async(e:any) => {
    setIsLoading(true)
    try {
      e.preventDefault()
      await addAct(CNR,acts)
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
        <Input type='text' onChange={(e) => setCNR(e.target.value)} placeholder='16-digit CNR Number' required/>
        <Button>Search</Button>
      </form>
      
      {
        acts!==undefined && <form className='mt-5 flex flex-col gap-3' onSubmit={handleSubmit}>
        {
          acts.map((item:any,index:number) => (
            <div className="flex gap-3" key={index}>
              <Input type='text' placeholder='Act in violation' value={item.name} disabled required/>
              <Input type='text' placeholder='Section' value={item.section} disabled required/>
              <Button type='button' size='icon' className='w-[36px] flex-none bg-red-800 hover:bg-red-900 text-white' onClick={() => {setActs((prev:any) => prev.toSpliced(index,1))}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </Button>
            </div>
          ))
        }
        {
          acts.length==0 && <p className='text-red-600'>No violated acts registered</p>
        }
        <div className="flex gap-3">
          <Input type='text' placeholder='Act in violation' value={newAct.name} onChange={(e) => setNewAct({...newAct,['name']:e.target.value})}/>
          <Input type='text' placeholder='Section' value={newAct.section} onChange={(e) => setNewAct({...newAct,['section']:e.target.value})}/>
          <Button type='button' size='icon' className='w-[36px] flex-none bg-blue-600 hover:bg-blue-700 text-white' onClick={handleAddAct}>
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