"use client"
import React, { useEffect, useState } from 'react'
import { viewOwnedFiles } from '@/hooks/useFileTransferContract'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AccessListTable2 from '@/components/AccessListTable2'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import FileUploadButton from '@/components/FileUploadButton'
import ownedFilesPlaceholder from '../../../../public/images/ownedFilesPlaceholder.png'
import PageTitle from '@/components/PageTitle'

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [listView, setListView] = useState<any|undefined>(undefined)
  const [files, setFiles] = useState<any>([])
  const [allUsers, setAllUsers] = useState([])

  const loadFiles = async() => {
    var data = await viewOwnedFiles().then((res) => {
      if(res){
        var d=res.filter((i:any) => i.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1)
        setFiles(d)
      }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    loadFiles()
  },[searchQuery])

  const fetchUsers = async() => {
    const response = await fetch('/api/vault/getAllUsers', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    const users = await response.json()
    .then((result) => {
      setAllUsers(result)
      console.log(result)
    })
  }

  useEffect(() => {
    fetchUsers()
  },[])

  // console.log(files)

  return (
    <div>
      <PageTitle>Manage Access</PageTitle>
      <div className="relative w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <Input className='pl-8 mb-4' type="text" placeholder="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
      </div>
      { // If user owns no files
        files.length===0 ? (
        <div className="grid min-h-[60vh] justify-items-center content-center">
          <Image
            src={ownedFilesPlaceholder}
            alt="No files found"
            className="w-[300px] mb-5"
            priority
          />
          <h1 className="font-medium text-[18px] sm:text-[20px]">No files found</h1>
          { // If search result is empty
            searchQuery==="" && <>
              <h2 className="text-gray-500 text-[15px] mb-5 text-center"> Get started by dropping files or selecting from your computer </h2>
              <FileUploadButton />
            </>
          }
        </div>
        ) : (
      <div className="">
        {
          files.map((file:any,index:number) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger className='hover:no-underline px-2'>
                  <div className="flex gap-4">
                    {file.name}
                    <div className="flex gap-2">
                      <Badge variant='secondary'>{file.createdAt}</Badge>
                      <Badge variant='secondary'>{file.size}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='px-2'>
                  <Link href={`/Vault/manageAccess/${file.publicid}`}>
                    <Button className='mb-2'>View more</Button>
                  </Link>
                  <AccessListTable2 publicid={file.publicid} users={allUsers}/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        }
      </div>
      )
    }
    </div>
  )
}

export default Page