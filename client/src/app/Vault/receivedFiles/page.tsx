"use client"
import { viewRecievedFiles } from "@/hooks/useFileTransferContract"
import { useState, useLayoutEffect, Key, useEffect } from "react"
import { Input } from "@/components/ui/input"
import receivedFilesPlaceholder from '../../../../public/images/receivedFilesPlaceholder.png'
import Image from "next/image"
import FileUploadButton from "@/components/FileUploadButton"
import Loader from "@/components/Loader"
import { connectWallet } from '@/hooks/useFileTransferContract'
import ReceivedFile from "@/components/ReceivedFile"
import Link from "next/link"
import { Button } from "@/components/ui/button"



const page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [listView, setListView] = useState<any|undefined>(undefined)
  const [files, setFiles] = useState<any>([])

  const loadFiles = async() => {
    var data = await viewRecievedFiles().then((res) => {
      if(res){
        var d=res.filter((i:any) => i.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1)
        setFiles(d)
      }
    })
    setIsLoading(false)
  }

    useEffect(() => {
      connectWallet()
    })

  useLayoutEffect(() => {
    loadFiles()
  },[searchQuery])

  console.log(files)

  
  return isLoading ? (
    <>
      <Loader/>
    </>
  ) : (
    <>
          <div className="flex gap-4">
            <Input type="text" placeholder="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
          </div>
      { // If user owns no files
        files.length===0 ? (
        <div className="grid min-h-[60vh] justify-items-center content-center">
          <Image
            src={receivedFilesPlaceholder}
            alt="No files found"
            className="w-[300px] mb-5"
          />
          <h1 className="font-medium text-[20px]">No files found</h1>
          { // If search result is empty
            searchQuery==="" && <>
              <h2 className="text-gray-500 text-[15px] mb-5">You have not received any file.</h2>
              <Link href='/Vault/requestFiles'>
                <Button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Request Files
                </Button>
              </Link>
            </>
          }
        </div>
        ) : (
          <>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {
              files?.map((file:any, index:number) => (
                <ReceivedFile
                key={index}
                listView={listView}
                file={file}
                refreshData={loadFiles}
                />
              ))
            }
          </div>
          </>
        )
      }
        
    </>
  )
}


export default page