"use client"
import CaseCard from '@/components/CaseCard'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import uploadFilesPlaceholder from '../../../../public/images/uploadFIlesPlaceholder.png'
import { Badge } from '@/components/ui/badge'
import { useStorageUpload } from '@thirdweb-dev/react';
import { useDropzone } from "react-dropzone"
import { fromJSON } from 'postcss'
import { addPublicDocument } from '@/hooks/useLegalDataContract'


const Page = () => {
  const [CNR, setCNR] = useState("")
  const [form, setForm] = useState({
    name:"",
    type:"",
    uploadedAt:""
  })
  const [file, setFile] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)


  const handleSearch = async(e:any) => {
    e.preventDefault()
    setCNR(e.target[0].value)
  }

  const { mutateAsync: upload } = useStorageUpload()

  const onDrop = useCallback(
    async  (acceptedFile: File[]) => {
      setFile(acceptedFile)
    },
    [upload]
  )
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    var data = form
    data['uploadedAt'] = new Date().toJSON().slice(0,10)
    const uri = await upload({
      data: file
    })
    console.log(uri)
    addPublicDocument(CNR,form,uri[0])
    setIsLoading(false)
  }
  // console.log(form,file)

  return (
    <>
      <PageTitle>Upload Public Documents and Court Orders</PageTitle>
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <Input type='text' placeholder='16-digit CNR Number' className='pl-8' required/>
        </div>
        <Button type='submit'>Search</Button>
      </form>
      <CaseCard CNR={CNR}/>

      {
        CNR!=="" &&
        <main>
          <form onSubmit={handleSubmit} className='mt-4'>
            
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="">
                <Label>Name of the file</Label>
                <Input className='mb-3' type='text' onChange={(e) => setForm({...form,['name']:e.target.value})} required/>
              </div>

              <div className="">
                <Label>Type</Label>
                <Select onValueChange={(val) => setForm({...form,['type']:val.toString()})} required>
                  <SelectTrigger className="mb-3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Interim Order">Interim Order</SelectItem>
                    <SelectItem value="Final Order">Final Order</SelectItem>
                    <SelectItem value="Judgement">Judgement</SelectItem>
                    <SelectItem value="misc">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-fit" {...getRootProps()}>
              {/* <Label htmlFor="file">Files</Label> */}
              <Input {...getInputProps()} id="file" type="file" name="file" className='w-fit' required/>
              {
                isDragActive ? 
                <div className='grid justify-items-center text-center border border-dashed border-gray-500 p-[30px] rounded-[20px] w-fit'>
                  <Image
                    src={uploadFilesPlaceholder}
                    alt="No files found"
                    className="w-[300px] mb-5"
                  />
                  <h1 className='text-sm mb-3'>Drop here...</h1>
                </div> :
                <div className='grid justify-items-center text-center border border-dashed border-gray-500 p-[30px] rounded-[20px] w-fit'>
                  <Image
                    src={uploadFilesPlaceholder}
                    alt="No files found"
                    className="w-[300px] mb-5"
                  />
                  {
                    acceptedFiles.length===0?(
                      <>
                        <h1 className='text-sm mb-3'>Drag and drop your file<br/>OR<br/></h1>
                        <Button type="button">Select file</Button>
                      </>
                    ) : (
                      <>
                        {acceptedFiles.map((file:any,index:number) => (
                          <Badge key={index}>{file?.name}</Badge>
                        ))}
                      </>
                    )
                  }
                </div>
              }
              {
                
              }
            </div>

            <Button className='mt-4' disabled={isLoading} type='submit'>
              {
                isLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              }
              Submit
            </Button>
          </form>
        </main>
      }
    </>
  )
}

export default Page