"use client"
import { viewOwnedFiles } from "@/hooks/useFileTransferContract"
import { useState, useLayoutEffect, Key, useEffect } from "react"
import OwnedFile from "@/components/OwnedFile"
import { Input } from "@/components/ui/input"
import ownedFilesPlaceholder from '../../../public/images/ownedFilesPlaceholder.png'
import Image from "next/image"
import FileUploadButton from "@/components/FileUploadButton"
import Loader from "@/components/Loader"
import { connectWallet } from '@/hooks/useFileTransferContract'



const page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [listView, setListView] = useState<any|undefined>(undefined)
  const [files, setFiles] = useState<any>([])

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
      connectWallet()
    })

  useLayoutEffect(() => {
    loadFiles()
  },[searchQuery])

  
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
            src={ownedFilesPlaceholder}
            alt="No files found"
            className="w-[300px] mb-5"
          />
          <h1 className="font-medium text-[20px]">No files found</h1>
          { // If search result is empty
            searchQuery==="" && <>
              <h2 className="text-gray-500 text-[15px] mb-5"> Get started by dropping files or selecting from your computer </h2>
              <FileUploadButton />
            </>
          }
        </div>
        ) : (
          <>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {
              files?.map((file:any, index:number) => (
                <OwnedFile key={index} listView={listView} file={file} refreshData={loadFiles}/>
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