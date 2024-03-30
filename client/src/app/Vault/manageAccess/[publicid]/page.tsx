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
import { getOwnedFile, grantAccess, viewAccessList } from '@/hooks/useFileTransferContract'
import { decryptfile } from '@/lib/decryptFile'
import { encryptfile } from '@/lib/encryptFile'
import { useStorageUpload } from '@thirdweb-dev/react';
import { generateId } from '@/lib/utils'

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


  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setIsGrantLoading(true)
    try {
          fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${ogFile.cid.split('//')[1]}`)
          .then((res) => res.blob())
          .then(async blob => {
            readFile(blob)
            const nfile = new File([blob],ogFile.name, {type : ogFile.format});

            if(ogFile.encrypted===true){
              decryptfile(nfile,ogFile.format,"password")
              .then(async(res) => {
                var encrypted:any = await encryptfile(res?.fileBlob,res?.fileBlob.type,"newpassword")
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:generateId(40),['cid']:uri[0]})
              })
            }
            else{
                var encrypted:any = await encryptfile(nfile,nfile.type,"newpassword")
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:generateId(40),['cid']:uri[0]})
            }
          })

          setIsGrantLoading(false)
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
        exists: res[11]
      })
    })
    console.log(accessData)
    setIsLoading(false)
  } 
  useEffect(() => {
    getAccessList()

  },[])

  console.log(ogFile)

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Drawer>
      <DrawerTrigger asChild>
        <Button>Grant access</Button>
      </DrawerTrigger>
      <DrawerContent className='grid w-full justify-items-center'>
        <DrawerClose className='mt-4 w-fit'>
          <Button variant="outline">Cancel</Button>
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
          <Button type='submit' className='w-full'>
            {
              isGrantLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            }
            Submit
          </Button>
        </form>
        
      </DrawerContent>
    </Drawer>
    <h1>{params.publicid}</h1>
    </>
  )
}

export default page