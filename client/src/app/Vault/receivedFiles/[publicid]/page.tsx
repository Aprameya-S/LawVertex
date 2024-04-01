"use client"
import React, { useEffect, useState } from 'react'
import { viewFile } from '@/hooks/useFileTransferContract'
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { decryptfile } from '@/lib/decryptFile';
import MultiMediaRenderer from '@/components/MultiMediaRenderer';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {toast} from 'react-toastify';
import FileInfo from '@/components/FileInfo';

function readFile(input:any){
  const fr = new FileReader()
  fr.readAsDataURL(input)
  fr.addEventListener('load', () => {
    const res = fr.result
    // console.log(res)
  })
}

const page = ({ params }: { params: { publicid: string } }) => {
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState<any>("")
  const [isLoading, setIsLoading] = useState(true)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState<string>("")

  const  fetchData = async() => {
    try{
      const data = await viewFile(params.publicid as string)
      .then((res) => {
        setFile({
          owner: res[0],
          name: res[1],
          desc: res[2],
          format: res[3],
          size:res[4],
          createAt: res[5],
          publicid:res[6],
          cid: res[7],
          encrypted:  res[8],
          searchable: res[9],
          canRequest: res[10],
          exists: res[11]
        })

        //if file is encrypted, decrypt and set url
        if(res[8]===true){
          fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${res[7].split('//')[1]}`)
          .then((res) => res.blob())
          .then(blob => {
            readFile(blob)
            const nfile = new File([blob],res[1], {type : res[3]});
            // console.log(nfile)
            decryptfile(nfile,res[3],"password12")
            .then((res) => {
              if(res===undefined){
                toast("Wrong password")
                throw("Wrong password")
              }
              setFileUrl(res?.fileLink)
              // console.log(res)
            })
          })
          .then(() => {
            setIsLoading(false)
          })
        }
        else{
          setFileUrl(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${res[7].split('//')[1]}`)
          setIsLoading(false)
        }
      })
     
    } catch(error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log("wrong password")
    }
  },[])



  return isLoading ? (
    <Loader />
  ) : passwordModalVisible ? (
    <>
      
      <div className="w-full h-full">
        <h1>password</h1>
        <InputOTP maxLength={10} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(e) => setPassword(e)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
            <InputOTPSlot index={9} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </>
  ) : (
    <div>
      <FileInfo file={file}/>
      <div className="mt-4">
        {
          !file.encrypted && <MultiMediaRenderer url={fileUrl}/>
        }

        <a href={fileUrl} download={file.name}>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Download
          </Button>
        </a>
      </div>
    </div>
  )
}

export default page