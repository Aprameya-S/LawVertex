"use client"
import { viewRecievedFiles } from "@/hooks/useFileTransferContract"
import { useState, useLayoutEffect, Key, useEffect } from "react"
import { Input } from "@/components/ui/input"
import receivedFilesPlaceholder from '../../../../public/images/receivedFilesPlaceholder.png'
import Image from "next/image"
import FileUploadButton from "@/components/FileUploadButton"
import Loader from "@/components/Loader"
import ReceivedFileCard from "@/components/ReceivedFileCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import useLocalStorage from "@/hooks/useLocalStorage"
import PageTitle from "@/components/PageTitle"



const Page = () => {
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

  const [recvFilesLayout,setRecvFileLayout] = useLocalStorage("layout","grid")


  useLayoutEffect(() => {
    loadFiles()
  },[searchQuery])

  // console.log(files)

  
  return isLoading ? (
    <>
      <Loader/>
    </>
  ) : (
    <>
    <PageTitle>Received Files</PageTitle>
          <div className="flex gap-3">
            <div className="relative w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              <Input className="pl-8" type="text" placeholder="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
            </div>
            <Button variant='ghost' size='icon' className="mr-2" onClick={(e) => setRecvFileLayout((prev:string) => prev=="grid"?"list":"grid")}>
              {recvFilesLayout!=="grid" ? (
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
            src={receivedFilesPlaceholder}
            alt="No files found"
            className="w-[300px] mb-5"
          />
          <h1 className="font-medium text-[18px] sm:text-[20px]">No files found</h1>
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
          <div className={`${recvFilesLayout==="grid"?'grid':'block'} sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-6`}>
            {
              files?.map((file:any, index:number) => (
                <ReceivedFileCard
                key={index}
                filesLayout={recvFilesLayout}
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


export default Page