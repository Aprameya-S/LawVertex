import React, { useState } from 'react'
import PdfRenderer from '@/components/PdfRenderer'
import { MediaRenderer } from "@thirdweb-dev/react";
// import PreviewModal from "react-media-previewer";
import { Button } from './ui/button';
// import { render } from "react-dom";

interface dataType{
  fileUrl: string,
  fileFormat: string
}

const MultiMediaRenderer = (props:any) => {
  const [visible,setVisible] = useState(false)

  return (
    <div className="shrink-0">
      {
        props.url.substr(props.url.length - 3)==="pdf" ? (
          <div className="mt-4">
            <PdfRenderer url={props.url} />
          </div>
        ) : (
          <div className="border border-dashed border-gray-500 p-[30px] rounded-[20px] w-fit mt-4">
            <MediaRenderer className='' src={props.url}/>
          </div>
        )
      }
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