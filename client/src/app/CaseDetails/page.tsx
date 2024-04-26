import PageTitle from '@/components/PageTitle'
import React from 'react'
import { Card } from '@/components/ui/card'

const Page = () => {
  const stats = [
    {
      value:"39",
      title:"High Court Complexes"
    },
    {
      value:"6.18 M",
      title:"HC Pending Cases"
    },
    {
      value:"38.47 M",
      title:"HC Disposed Cases"
    },
    {
      value:"48.25 K",
      title:"HC Cases Listed Today"
    },
    {
      value:"3525",
      title:"District & Taluka Court Complexes"
    },
    {
      value:"44.66 M",
      title:"DC Pending Cases"
    }
  ]

  
  return (
    <>
      <PageTitle>Home</PageTitle>
      <div className="block w-full h-[60px] bg-gradient-to-b from-white dark:from-[#0e0e10] to-transparent mb-[-60px] z-20 relative dark:hidden"></div>
      <img src='./images/SCI.jpg' alt='court' className='block z-10 relative rounded-[20px]'/>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {
          stats.map((item,index) => (
            <Card key={index} className='border-2 border-input p-4 shadow-md'>
              <h1 className='text-center text-[30px] font-semibold'>{item.value}</h1>
              <h2 className='text-center text-[16px] font-medium'>{item.title}</h2>
            </Card>
          ))
        }
      </div>
      
    </>
  )
}

export default Page