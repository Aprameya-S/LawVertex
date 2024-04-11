import React from 'react'
import PdfRenderer from '@/components/PdfRenderer'
import { MediaRenderer } from "@thirdweb-dev/react";
import PreviewModal from "react-media-previewer";
import { render } from "react-dom";

interface dataType{
  fileUrl: string,
  fileFormat: string
}

const MultiMediaRenderer = (props:any) => {
  return (
    <>
    {
        props.url.substr(props.url.length - 3)==="pdf" ? (
          <PdfRenderer url={`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${props.url.split('//')[1]}`} />
        ) : (
          <div className="border border-dashed border-gray-500 p-[30px] rounded-[20px] w-fit">
            <MediaRenderer className='' src={props.url}/>
          </div>
        )
      }
      {/* <PreviewModal
        visible={visible}
        // name="image.png"
        setVisible={setVisible}
        urls={[
          "https://assets.ruilisi.com/attachment-8de9464b-d286-43a9-b18e-f8a984bf8623.jpg",
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        ]}
      /> */}
    </>
  )
}

export default MultiMediaRenderer