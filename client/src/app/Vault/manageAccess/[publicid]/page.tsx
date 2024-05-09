"use client"
import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
import { decryptfile } from '@/lib/AES'
import { encryptfile } from '@/lib/AES'
import { useStorageUpload } from '@thirdweb-dev/react';
import { generateId } from '@/lib/utils'
import FileInfo from '@/components/FileInfo'
import Image from 'next/image'
import accessPlaceholder from '../../../../../public/images/accessPlaceholder.png'
import AccessListTable from '@/components/AccessListTable'


function readFile(input:any){
  const fr = new FileReader()
  fr.readAsDataURL(input)
  fr.addEventListener('load', () => {
    const res = fr.result
    // console.log(res)
  })
}


const Page = ({ params }: { params: { publicid: string } }) => {
  const [form, setForm] = useState({
    receivingUserAddress:'',
    viewOnly:false
  })
  const { mutateAsync: upload } = useStorageUpload()
  const [ogFile, setOgFile] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isGrantLoading, setIsGrantLoading] = useState(false)
  const [accessList, setAccessList] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [allUsers, setAllUsers] = useState([])

  // console.log(allUsers)
  
  

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    try {
      setIsGrantLoading(true)
      var newpublicid=generateId(40)
      var newpassword=generateId(10)
          fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${ogFile.cid.split('//')[1]}`)
          .then((res) => res.blob())
          .then(async blob => {
            readFile(blob)
            const nfile = new File([blob],ogFile.name, {type : ogFile.format});

            if(ogFile.encrypted===true){
              decryptfile(nfile,ogFile.format,"password")
              .then(async(res) => {
                var encrypted:any = await encryptfile(res?.fileBlob,res?.fileBlob.type,newpassword)
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:generateId(40),['cid']:uri[0]})
                setIsGrantLoading(false)
              
              })
            }
            else{
                var encrypted:any = await encryptfile(nfile,nfile.type,newpassword)
                var encFile = new File([encrypted.fileBlob], ogFile.name);
                const uri = await upload({
                  data: [encFile]
                })
  
                await grantAccess({...form,['ogpublicid']:params.publicid,['publicid']:newpublicid,['cid']:uri[0]})
                setIsGrantLoading(false)
            }

            var owner= allUsers.filter((i:any) => i.address.toLowerCase()==ogFile.owner.toLowerCase())[0]
            var rec= allUsers.filter((i:any) => i.address.toLowerCase()==form.receivingUserAddress.toLowerCase())[0]

            const response = await fetch('/api/vault/newFilePasswordMail', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                fileName: ogFile.name,
                senderName:owner['name'],
                senderWalletAddress: ogFile.owner,
                receiverWalletAddress: form.receivingUserAddress,
                password: newpassword,
                publicid: newpublicid,
                mailTo:rec['email']
              })
            })
            console.log(await response.json())
          })

    } catch (error) {
      console.log(error)
      setIsGrantLoading(false)
    }
  }

  const getData = async() => {
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

    const response = await fetch('/api/vault/getAllUsers', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })

    const users = await response.json()
    .then(async(result) => {
      setAllUsers(result)
      var accessData = await viewAccessList(params.publicid)
      .then((res) => {
        // console.log(res)
        let list:any = []

        res.forEach((i:any) => {
          let item = {
            ogpublicid:i.ogpublicid,
            publicid:i.publicid,
            user:i.user,
            username: result.filter((j:any) => j.address.toLowerCase()==i.user.toLowerCase())[0]?result.filter((j:any) => j.address.toLowerCase()==i.user.toLowerCase())[0]['name']:"Unknown",
            valid:i.valid,
            viewOnly: i.viewOnly,
          }
          list.push(item)
        })

        setAccessList(list)
      })
    })

    // setAccessList(accessData)
    setIsLoading(false)
    
  } 

  useEffect(() => {
    getData()
  },[])
  


  return isLoading ? (
    <Loader />
  ) : (
    <>
    <FileInfo file={ogFile}/>

    <div className="flex gap-4 my-4">
      <div className="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <Input className='pl-8' type="text" placeholder="Search name or address" onChange={(e)=>setSearchQuery(e.target.value)}/>
      </div>

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

            {/* <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow mt-5 mb-5">
              <Checkbox id='pfilesearchable' className='mt-[2px]' onCheckedChange={(e:any) => setForm({...form, ['viewOnly']: e?true:false})}/>
              <label className="text-sm font-medium " htmlFor="pfilesearchable">
                View Only<br/>
                <p className='text-gray-500'>Enabling this does not allow file download.</p>
              </label>
            </div> */}
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
      accessList.filter((i:any) => i.username.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1 || i.user.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1).length===0 ? (
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
        <AccessListTable accessList={accessList.filter((i:any) => i.username.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1 || i.user.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1)}/>
      )
    }

    </>
  )
}

export default Page