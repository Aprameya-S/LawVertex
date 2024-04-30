import { getHistory } from '@/hooks/useLegalDataContract'
import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'


const PastHearings = (props:any) => {
  const [history, setHistory] = useState([])
  const [selectedHearing, setSelectedHearing] = useState<any>({})

  const getData = async() => {
    var data = await getHistory(props.CNR)
    setHistory(data)
  }

  useEffect(() => {
    getData()
  },[])

  

  return (
    <>
    <h2 className='font-medium text-blue-600 my-2'>Case History</h2>
    <main>
      <div className="rounded-[16px] border-2 border-input overflow-hidden">
        <div className="grid grid-cols-4">
          <p className='font-semibold text-sm  p-2 pl-4 border-r-2 border-input'>Judge</p>
          <p className='font-semibold text-sm  p-2 pl-4 border-r-2 border-input'>Business on Date</p>
          <p className='font-semibold text-sm  p-2 pl-4 border-r-2 border-input'>Next Hearing Date</p>
          <p className='font-semibold text-sm  p-2 pl-4'>Purpose of Hearing</p>
        </div>
        <Drawer>
        {
          history.map((item:any,index:number) => (
            <div className="grid grid-cols-4 border-t-2 border-input" key={index}>
              <p className='text-sm p-2 pl-4 border-r-2 border-input'>{item.judge}</p>
              <DrawerTrigger asChild onClick={() => setSelectedHearing(item)}>
                <p className='text-sm p-2 pl-4 border-r-2 border-input text-blue-600 underline cursor-pointer'>{item.date}</p>
              </DrawerTrigger>
              <p className='text-sm p-2 pl-4 border-r-2 border-input'>{item.next_hearing_date}</p>
              <p className='text-sm p-2 pl-4'>{item.next_hearing_purpose}</p>
            </div>
          ))
        }

          <DrawerContent>
            <DrawerHeader>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="grid mx-[20px] justify-items-center mb-[100px]">
              <h1 className='text-[20px] font-semibold'>Status of the day</h1>
              <h2 className='font-medium text-muted-foreground'>CNR: {props.CNR}</h2>
              <div className="grid grid-cols-[200px_1fr] w-[min(800px,100%)] mt-[30px] border-2 border-input rounded-[16px] p-4">
                <b>Business: </b>
                <p>{selectedHearing.business}</p>
                <hr className='my-2 '/><hr className='my-2 '/>
                <b>Next Hearing Date: </b>
                <p>{selectedHearing.next_hearing_date}</p>
                <hr className='my-2 '/><hr className='my-2 '/>
                <b>Next Hearing Purpose: </b>
                <p>{selectedHearing.next_hearing_purpose}</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        
      </div>
      
    </main>
    </>
  )
}

export default PastHearings