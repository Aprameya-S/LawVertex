import React, { useState } from 'react'
import PdfRenderer from '@/components/PdfRenderer'
import { MediaRenderer } from "@thirdweb-dev/react";
// import PreviewModal from "react-media-previewer";
import { Button } from './ui/button';

interface Props{
  fileUrl: string,
  fileFormat: string
}

const MultiMediaRenderer = (props:any) => {
  const [visible,setVisible] = useState(false)
  // console.log(props)

  if(props.format.includes("image/")) return (
    <div className="border border-dashed border-gray-500 p-[20px] rounded-[15px] w-full sm:w-fit sm:max-w-[400px] mt-4">
      <img src={props.url}/>
    </div>
  )
  if(props.format==="application/pdf") return (
    <div className="mt-4 w-[min(500px,100%)]">
      <PdfRenderer url={props.url} />
    </div>
  )
  if(props.encrypted) return (
    <div className="border border-dashed border-gray-500 p-[20px] rounded-[15px] w-full sm:w-fit sm:max-w-[400px] mt-4 text-center ">
      File preview not available
    </div>
  )
  if(props.format==="audio/mpeg") return (
    <div className="border border-dashed border-gray-500 p-[20px] rounded-[15px] w-full sm:w-fit sm:max-w-[400px] mt-4 text-center ">
      <audio controls >
        <source src={props.url} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio> 
    </div>
  )
  return (
    <div className="">        
      <div className="border border-dashed border-gray-500 p-[20px] rounded-[15px] w-fit mt-4">
        <MediaRenderer className='' src={props.url}/>
      </div>
      <audio controls >
        <source src={props.url} type="audio/mpeg" className='bg-transparent'/>
        Your browser does not support the audio element.
      </audio> 
   
      {/* <Image src={props.url} alt='preview' width={100} height={100}/> */}
      
      {/* <Button onClick={() => setVisible((prev) => !prev)}>Preview</Button>
      <div className="w-[100px] overflow-hidden hidden">
        <PreviewModal
          visible={visible}
          // name="image.png"
          setVisible={setVisible}
          urls={[
            props.url
          ]}
          
        />
      </div> */}
    </div>
  )
}

export default MultiMediaRenderer