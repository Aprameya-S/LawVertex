"use client"
import { viewOwnedFiles } from "@/hooks/useFileTransferContract"
import { useState, useLayoutEffect, Key, useEffect } from "react"
import OwnedFileCard from "@/components/OwnedFileCard"
import { Input } from "@/components/ui/input"
import ownedFilesPlaceholder from '../../../public/images/ownedFilesPlaceholder.png'
import Image from "next/image"
import FileUploadButton from "@/components/FileUploadButton"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import useLocalStorage from "@/hooks/useLocalStorage"

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
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

  useLayoutEffect(() => {
    loadFiles()
  },[searchQuery])

  const [filesLayout,setFileLayout] = useLocalStorage("layout","grid")

  
  return isLoading ? (
    <>
      <Loader/>
    </>
  ) : (
    <>
          <div className="flex gap-3">
            <Input type="text" placeholder="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
            <Button variant='ghost' size='icon' className="mr-2" onClick={(e) => setFileLayout((prev:string) => prev=="grid"?"list":"grid")}>
              {filesLayout!=="grid" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>
              )
              }
            </Button>
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
          <h1 className="font-medium text-[20px]">No files found</h1>
          { // If search result is empty
            searchQuery==="" && <>
              <h2 className="text-gray-500 text-[15px] mb-5 text-center"> Get started by dropping files or selecting from your computer </h2>
              <FileUploadButton />
            </>
          }
        </div>
        ) : (
          <>
          <div className={`${filesLayout==="grid"?'grid':'block'} sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-8`}>
            {
              files?.map((file:any, index:number) => (
                <OwnedFileCard filesLayout={filesLayout} key={index} file={file} refreshData={loadFiles}/>
              ))
            }
          </div>
          </>
        )
      }
        
    </>
  )
}


export default Page