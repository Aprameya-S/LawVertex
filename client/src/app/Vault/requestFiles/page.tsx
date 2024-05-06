"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import PageTitle from '@/components/PageTitle'
import { viewRequestableFiles } from '@/hooks/useFileTransferContract'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Page = () => {
  const [form, setForm] = useState({ownerAddress:"",fileName:""})
  const [isLoading, setIsLoading] = useState(false)
  const [userFiles, setUserFiles] = useState([])
  const [otherFile, setOtherFile] = useState(false)

  const handleRequest = async(e:any) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if(form.fileName==""){
        toast.error("Please select or type in a file name.")
        throw("File not selected")
      }
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const accounts = await ethereum.request({method: 'eth_accounts'})
      
      const response = await fetch('/api/vault/getAllUsers', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      // fileName, fromAddress, fromName, mailTo
      const users = await response.json()
      .then(async(result) => {
        var owner= result.filter((i:any) => i.address.toLowerCase()==form.ownerAddress.toLowerCase())[0]
        var req= result.filter((i:any) => i.address.toLowerCase()==accounts[0].toLowerCase())[0]
  
        console.log({
          fileName: form.fileName,
          fromAddress:accounts[0],
          fromName:req['name'],
          mailTo: owner['email']
        })
        const mail = await fetch('/api/vault/requestFileAccessMail', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            fileName: form.fileName,
            fromAddress:accounts[0],
            fromName:req['name'],
            mailTo: owner['email']
          })
        })
        toast("Request sent.")
      })
    } catch (error) {
      if(error!="File not selected")
        toast.error("The file owner is not registered on Lawvertex Vault.")
      console.log(error)
    }
    setIsLoading(false)
  }

  const viewFiles = async() => {
    try {
      const files = await viewRequestableFiles(form.ownerAddress)
      if(!files) throw("User not found")
      setUserFiles(files.filter((i:string) => i!=""))
    } catch (error:any) {
      toast.error(error)
    }
  }

  // console.log(form)

  return (
    <div>
      <PageTitle>Request Files</PageTitle>
      <form onSubmit={handleRequest}>
        <Label>Request from: </Label>
        <div className="flex gap-3">
          <Input placeholder='0x...' onChange={(e) => setForm({...form,['ownerAddress']:e.target.value})} className='mb-4' required/>
          <Button type='button' onClick={viewFiles} variant='secondary' disabled={form.ownerAddress.length!=42}>View files</Button>
        </div>
        
        <div className="">
          {
            userFiles?.length==0 ? (
              <p></p>
            ) : (
              <>
              <Label>File:</Label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Select onValueChange={(val) => {
                  if(val=="other")
                    setOtherFile(true)
                  else{
                    setForm({...form,['fileName']:val})
                    setOtherFile(false)
                  }
                }}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="File" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='other' className='bg-blue-700 hover:bg-blue-700'>Other file</SelectItem>
                    <SelectGroup>
                      <SelectLabel>Existing files</SelectLabel>
                      {
                        userFiles?.map((file:any, index:number) => (
                          <SelectItem key={index} value={file}>{file}</SelectItem>
                        ))
                      } 
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                {
                  otherFile && (
                    <div className="">
                      <Input placeholder='file.pdf' onChange={(e) => setForm({...form,['fileName']:e.target.value})} className='mb-4' required/>
                    </div>
                  )
                }
                
              </div>
              </>
            )
          }
        </div>
       
        
        <Button type='submit' disabled={isLoading}>
        {
          isLoading ? ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin mr-2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send mr-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          )
        }
        Request
        </Button> 
      </form>
    </div>
  )
}

export default Page