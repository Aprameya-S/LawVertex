"use client"
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Loader from '@/components/Loader'
import { getOwnedFile, grantAccess, viewAccessList, revokeAccess } from '@/hooks/useFileTransferContract'
import { decryptfile } from '@/lib/decryptFile'
import { encryptfile } from '@/lib/encryptFile'
import { useStorageUpload } from '@thirdweb-dev/react';
import { generateId } from '@/lib/utils'
import { Resend } from 'resend';
import FileInfo from '@/components/FileInfo'
import Image from 'next/image'
import accessPlaceholder from '../../../../../public/images/accessPlaceholder.png'



function readFile(input:any){
  const fr = new FileReader()
  fr.readAsDataURL(input)
  fr.addEventListener('load', () => {
    const res = fr.result
    // console.log(res)
  })
}


const page = ({ params }: { params: { publicid: string } }) => {
  const [form, setForm] = useState({
    receivingUserAddress:'',
    viewOnly:false
  })
  const { mutateAsync: upload } = useStorageUpload()
  const [ogFile, setOgFile] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isGrantLoading, setIsGrantLoading] = useState(false)
  const [isRevokeLoading, setIsRevokeLoading] = useState(false)
  const [accessList, setAccessList] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState<string>("")


  const handleSubmit = async(e:any) => {
    e.preventDefault()
    try {
      setIsGrantLoading(true)
      var newpublicid=generateId(40)
          fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${ogFile.cid.split('//')[1]}`)
          .then((res) => res.blob())
          .then(async blob => {
            readFile(blob)
            const nfile = new File([blob],ogFile.name, {type : ogFile.format});

            if(ogFile.encrypted===true){
              decryptfile(nfile,ogFile.format,"password")
              .then(async(res) => {
                var encrypted:any = await encryptfile(res?.fileBlob,res?.fileBlob.type,"password12")
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:generateId(40),['cid']:uri[0]})
                setIsGrantLoading(false)
              
              })
            }
            else{
                var encrypted:any = await encryptfile(nfile,nfile.type,"password12")
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:newpublicid,['cid']:uri[0]})
                setIsGrantLoading(false)
            }
            const response = await fetch('/api/fileTransfer/newFilePasswordMail', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                fileName: ogFile.name,
                senderName: "Name",
                senderWalletAddress: ogFile.owner,
                receiverWalletAddress: form.receivingUserAddress,
                password: "password12",
                publicid:newpublicid,
                mailTo:"aprameya083@gmail.com"
              })
            })
            console.log(await response.json())
          })

    } catch (error) {
      console.log(error)
      setIsGrantLoading(false)
    }
  }

  const getAccessList = async() => {
    var accessData = await viewAccessList(params.publicid)
    const data = await getOwnedFile(params.publicid as string)
    .then((res) => {
      setOgFile({
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
        exists: res[11],
        copy: res.copy
      })
    })
    setAccessList(accessData)
    setIsLoading(false)
    
  } 

  useEffect(() => {
    getAccessList()
  },[])

  const handleRevokeAccess = async(publicid:string,userAddress:string,index:number) => {
    try {
      setIsRevokeLoading(true)
      await revokeAccess({publicid,userAddress})
      let newAccessList = accessList.splice(index,1);
      setAccessList(newAccessList)
      setIsRevokeLoading(false)
    } catch (error) {
      console.log(error)
      setIsRevokeLoading(false)
    }
  }
  // console.log(isGrantLoading)
  

  return isLoading ? (
    <Loader />
  ) : (
    <>
    <FileInfo file={ogFile}/>

    <div className="flex gap-4 my-4">
      <Input type="text" placeholder="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>

      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Grant access
          </Button>
        </DrawerTrigger>
        <DrawerContent className='grid w-full justify-items-center'>
          <DrawerClose className='mt-4 w-fit' asChild>
            <Button size='sm' variant="outline">Cancel</Button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>Grant Access</DrawerTitle>
          </DrawerHeader>
          

          <form onSubmit={handleSubmit} className='max-w-sm mb-20 mt-4'>
            <Label htmlFor="email">User address</Label>
            <Input type="text" id="email" placeholder="0x...." onChange={(e) => setForm({...form, ['receivingUserAddress']: e.target.value})} className='overflow-x-scroll' required/>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow mt-5 mb-5">
              <Checkbox id='pfilesearchable' className='mt-[2px]' onCheckedChange={(e:any) => setForm({...form, ['viewOnly']: e?true:false})}/>
              <label className="text-sm font-medium " htmlFor="pfilesearchable">
                View Only<br/>
                <p className='text-gray-500'>Enabling this does not allow file download.</p>
              </label>
            </div>
            <Button type='submit' className='w-full' disabled={isGrantLoading}>
              {
                isGrantLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin mr-2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              }
              Submit
            </Button>
          </form>
          
        </DrawerContent>
      </Drawer>
    </div>
      
    {
      accessList.length===0 ? (
        <div className="grid min-h-[40vh] justify-items-center content-center">
          <Image
            src={accessPlaceholder}
            alt="No users found"
            className="w-[300px] mb-5"
          />
          { // If search result is empty
            searchQuery==="" ? (
              <h1 className="font-medium text-[20px]">You have not granted access to anyone</h1>
            ) : (
              <h1 className="font-medium text-[20px]">User not found</h1>
            )
          }
        </div>
      ) : (
        <div className="overflow-x-scroll w-full">
          <table className='text-sm border-2 border-input rounded-md block min-w-[700px]'>
          <thead className='text-left w-full border-b-2 border-input'>
            <tr className='w-full grid grid-cols-[35px_1fr_2fr_2fr_70px_20px] px-3 py-2 items-center'>
              <th className='w-5'></th>
              <th>Name</th>
              <th>Address</th>
              <th>Public Id</th>
              <th>Valid</th>
              <th className='w-5'></th>
            </tr>
          </thead>
          <tbody className='text-left w-full'>
            {accessList.map((item:any,index:number) => (
              <tr key={index} className='odd:bg-transparent/5 dark:odd:bg-[#19191c] w-full grid grid-cols-[35px_1fr_2fr_2fr_70px_20px] px-3 py-2 items-center'>
                <td className='pr-3'>
                  <Button onClick={(e) => handleRevokeAccess(item.publicid,item.user,index)} disabled={isRevokeLoading} variant='destructive' size='icon' className='h-6 w-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-minus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  </Button>
                </td>
                <td className="font-medium pr-3">Name</td>
                <td className='truncate pr-3'>{item.user}</td>
                <td className='truncate pr-3'>{item.publicid}</td>
                <td className='pr-3'>{item.valid?'True':'False'}</td>
                <td className='text-blue-600 w-5 pr-3'>
                  {
                    item.viewonly ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )
                  }
                </td>
                
              </tr>
            ))}
            
          </tbody>
          </table>
        </div>
      )
    }

    </>
  )
}

export default page