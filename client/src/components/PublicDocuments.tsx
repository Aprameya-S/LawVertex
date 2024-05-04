import { viewPublicDocuments } from '@/hooks/useLegalDataContract'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'

interface PropTypes{
  CNR:string,
  types:Array<string>
}

const PublicDocuments = (props:PropTypes) => {
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async() => {
      setIsLoading(true)
      var data = await viewPublicDocuments(props.CNR)
      setFiles(data)
      setIsLoading(false)
    }
    getData()
  },[])

  // console.log(files)

  if(isLoading)return(<div className='mt-3'><Loader/></div>)
  return (
    <>
      <main>
        {/* Interim Orders */}
        {
          props.types.includes("Interim Orders") && 
          <>
          <h2 className='font-medium text-blue-600 my-2'>{files.filter((i:any)=>i.class=="Interim Order").length==0 && 'No '}Interim Orders</h2>
          {
            files.filter((i:any)=>i.class=="Interim Order").length!=0 &&
            <div className="rounded-[16px] border-2 border-input  text-sm overflow-hidden">
              <div className='grid grid-cols-[1fr_2fr_2fr]'>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Order No.</p>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Order Date</p>
                <p className='border-input pl-4 p-2 font-semibold border-b-2'>Order Details</p>
              </div>
            {
              files.filter((i:any)=>i.class=="Interim Order").map((item:any,index:number) => (
                <div key={index} className='grid grid-cols-[1fr_2fr_2fr]'>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{index+1}</p>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{item.uploadedAt}</p>
                  <a href={`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${item.cid.split('//')[1]}`} className='border-input pl-4 p-2 text-blue-600 hover:underline cursor-pointer border-b-2 flex' target='_blank'>
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </a>
                </div>
              ))
            }
            </div>
          }
          </>
        }


        {/* Final Orders */}
        {
          props.types.includes("Final Orders") && 
          <>
          <h2 className='font-medium text-blue-600 my-2 mt-4'>{files.filter((i:any)=>(i.class=="Final Order"||i.class=="Judgement")).length==0 && 'No '}Final Orders / Judgements</h2>
          {
            files.filter((i:any)=>(i.class=="Final Order"||i.class=="Judgement")).length!=0 &&
            <div className="rounded-[16px] border-2 border-input  text-sm overflow-hidden">
              <div className='grid grid-cols-[1fr_2fr_2fr]'>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Order No.</p>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Order Date</p>
                <p className='border-input pl-4 p-2 font-semibold border-b-2'>Order Details</p>
              </div>
            {
              files.filter((i:any)=>(i.class=="Final Order"||i.class=="Judgement")).map((item:any,index:number) => (
                <div key={index} className='grid grid-cols-[1fr_2fr_2fr]'>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{index+1}</p>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{item.uploadedAt}</p>
                  <a href={`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${item.cid.split('//')[1]}`} className='border-input pl-4 p-2 text-blue-600 hover:underline cursor-pointer border-b-2 flex' target='_blank'>
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </a>
                </div>
              ))
            }
            </div>
          }
          </>
        }

        
        {/* Miscellaneous */}
        {
          props.types.includes("misc") && 
          <>
          {
            files.filter((i:any)=>i.class=="misc").length!=0 &&
            <h2 className='font-medium text-blue-600 my-2 mt-4'>Miscellaneous</h2>
          }
          {
            files.filter((i:any)=>i.class=="misc").length!=0 &&
            <div className="rounded-[16px] border-2 border-input  text-sm overflow-hidden">
              <div className='grid grid-cols-[1fr_2fr_2fr]'>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>File No.</p>
                <p className='border-r-2 border-input pl-4 p-2 font-semibold border-b-2'>Upload date</p>
                <p className='border-input pl-4 p-2 font-semibold border-b-2'>Details</p>
              </div>
            {
              files.filter((i:any)=>i.class=="misc").map((item:any,index:number) => (
                <div key={index} className='grid grid-cols-[1fr_2fr_2fr]'>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{index+1}</p>
                  <p className='border-r-2 border-input pl-4 p-2 border-b-2'>{item.uploadedAt}</p>
                  <a href={`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${item.cid.split('//')[1]}`} className='border-input pl-4 p-2 text-blue-600 hover:underline cursor-pointer border-b-2 flex' target='_blank'>
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </a>
                </div>
              ))
            }
            </div>
          }
          </>
        }
      </main>
    </>
  )
}

export default PublicDocuments