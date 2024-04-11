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

const Page = ({ params }: { params: { publicid: string } }) => {
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState<any>("")
  const [isLoading, setIsLoading] = useState(true)
  const [passwordModalVisible, setPasswordModalVisible] = useState(true);
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
        setIsLoading(false)
      })
      
    } catch(error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  
  const handlePasswordSubmit = (e:any) => {
    e.preventDefault()
    //if file is encrypted, decrypt and set url
    try {
      if(file.encrypted===true){
        fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${file.cid.split('//')[1]}`)
        .then((res) => res.blob())
        .then(blob => {
          readFile(blob)
          const nfile = new File([blob],file.name, {type : file.format});
          // console.log(nfile)
          decryptfile(nfile,file.format,password)
          .then((res) => {
            setFileUrl(res?.fileLink)  
            if(res===undefined){
              toast("Incorrect password. Try again.")
            }
            else
              setPasswordModalVisible(false)
          })
        })
        .catch((err) =>{
          console.log(err)
        })
      }
      else{
        setFileUrl(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${file.cid.split('//')[1]}`)
        setPasswordModalVisible(false)
      }
    } catch (error) {
      setPasswordModalVisible(true)
      console.log(error)
      toast("Something went wrong...")
    }
  }

  useEffect(() => {
    fetchData()
  })


  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <FileInfo file={file}/>
      <div className="mt-4">
        {
          !file.encrypted && <MultiMediaRenderer url={fileUrl}/>
        }

        {
          passwordModalVisible ? (
              <form onSubmit={handlePasswordSubmit}  className="flex gap-3">
                <InputOTP maxLength={10} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(e) => setPassword(e)} required className=''>
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
                <Button size='icon' type='submit'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                </Button>
              </form>
          ) : (
            <a href={fileUrl} download={file.name}>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
                Download
              </Button>
            </a>
          )
        }
      </div>
    </div>
  )
}

export default Page