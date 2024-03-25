"use client"
import React, { useEffect, useState } from 'react'
import { getOwnedFile } from '@/hooks/useFileTransferContract'
import PdfRenderer from '@/components/PdfRenderer'
import { MediaRenderer } from "@thirdweb-dev/react";
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import Loader from '@/components/Loader';

const page = ({ params }: { params: { publicid: string } }) => {
  const [file, setFile] = useState<any>({})
  const [fileFormat, setFileFormat] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  var imageFormats = new Set(["jpg", "peg", "png", "svg"]);

  const  fetchData = async() => {
    try{
      const data = await getOwnedFile(params.publicid as string)
      .then((res) => {
        setFile({
          owner: res[0],
          name: res[1],
          desc: res[2],
          size:res[3],
          createAt: res[4],
          publicid:res[5],
          cid: res[6],
          searchable: res[7],
          canRequest: res[8],
          exists: res[9]
        })
        setFileFormat(res[6].substr(res[6].length - 3))
        // console.log(res)
        setIsLoading(false)
      })
    } catch(error) {
      console.log(error)
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      {
        fileFormat==="pdf" ? (
          <PdfRenderer url={`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${file?.cid.split('//')[1]}`} />
        ) : imageFormats.has(fileFormat) ? (
          <div className="border border-dashed border-gray-500 p-[20px] rounded-[20px] w-fit">
            <MediaRenderer className='rounded-[12px]' src={file.cid}/>
          </div>
        ) : (
          <div className="border border-dashed border-gray-500 p-[30px] rounded-[20px] w-fit">
            <MediaRenderer className='' src={file.cid}/>
          </div>
        )
      }
      <Button>
        <DownloadIcon className='ml-2 h-4 w-4'/>
        Download
      </Button>

    </div>
  )
}

export default page