"use client"
import React,{ useCallback, useState, useRef } from 'react'
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@thirdweb-dev/react';
import { useDropzone } from "react-dropzone"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Image from 'next/image';
import uploadFilesPlaceholder from '../../public/images/uploadFIlesPlaceholder.png'
import { addFile } from '@/hooks/useFileTransferContract';
import { Badge } from './ui/badge';
import { convertBytes, generateId } from '@/lib/utils';
import { encryptfile } from '@/lib/encryptFile';


const FileUploadButton = () => {
  const { toast } = useToast()
  const [file, setFile] = useState<File[]>([])
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    desc:'',
    format:'',
    size:'',
    createAt: '',
    publicid:'',
    cid: '',
    encrypted: false,
    searchable: false,
    canRequest: false
  })
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const { mutateAsync: upload } = useStorageUpload()

  const onDrop = useCallback(
    async  (acceptedFile: File[]) => {
      setFile(acceptedFile)
    },
    [upload]
  )
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

 
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    setIsUploadLoading(true)
    try {
      if (!file || file.length === 0){
        throw("Please select a file to submit");
      }
      if (file.length !== 1){
        throw("Please select a single file");
      }
      // console.log(file[0])
      if(form.encrypted){
        var encrypted:any = await encryptfile(file[0],file[0].type,"password")
        var encFile = new File([encrypted.fileBlob], file[0].name);
        // console.log(nfile)
        toast({
          title: "Encryption successful",
          action: (
            <a href={encrypted.fileLink} download={`${file[0].name}`}>
              <ToastAction altText="Goto schedule to undo">Download File</ToastAction>
            </a>
          ),
        })
    
        const uri = await upload({
          data: [encFile]
        })
        form.cid=uri[0]
      }
      else{
        const uri = await upload({
          data: file
        })
        form.cid=uri[0]
      }
    
      
      form.format=file[0].type
      form.size=convertBytes(file[0].size.toString())
      form.createAt=new Date().toJSON().slice(0,10)
      form.publicid=generateId(40)
      form.name=file[0].name
      // console.log(form)
  
      await addFile(form)
      .then(() => {
        closeBtnRef.current?.click()
        setIsUploadLoading(false)
      })
      
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Something went wrong. Try again."
      })
      setIsUploadLoading(false)
    }
  }

  // console.log(form)

  return (
    <>
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='mb-5' type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload mr-2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        
          Upload File
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='grid w-full justify-items-center'>
          <DrawerClose className='w-fit' asChild>
            <Button ref={closeBtnRef} variant="outline">Close</Button>
          </DrawerClose>
          <DrawerTitle className='pt-4'>Upload File</DrawerTitle>
          <DrawerDescription className='pb-4'>This action will trigger wallet transaction.</DrawerDescription>
        </DrawerHeader>

          <form onSubmit={handleSubmit} className="grid w-full justify-center gap-1.5  overflow-y-auto">
            <div className="" {...getRootProps()}>
              {/* <Label htmlFor="file">Files</Label> */}
              <Input {...getInputProps()} id="file" type="file" name="file" required novalidate/>
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
                        {acceptedFiles.map((file,index) => (
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
            <div className="w-full max-w-sm mt-4">

              <Label>Description</Label>
              <Textarea placeholder="..." className='mb-3' required  onChange={(e) => setForm({...form, ['desc']: e.target.value})}/>

              <div className="mb-3 flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow">
                <Checkbox id='pfileencrypted' className='mt-[2px]' onCheckedChange={(e:any) => setForm({...form, ['encrypted']: e?true:false})}/>
                <label className="text-sm font-medium " htmlFor="pfileencrypted">
                  Encryption<br/>
                  <p className='text-gray-500'>File will AES-256 encrypted.</p>
                </label>
              </div>
              <div className="mb-3 flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow">
                <Checkbox id='pfilesearchable' className='mt-[2px]' onCheckedChange={(e:any) => setForm({...form, ['searchable']: e?true:false})}/>
                <label className="text-sm font-medium " htmlFor="pfilesearchable">
                  Searchable<br/>
                  <p className='text-gray-500'>Make this file searchable by others.</p>
                </label>
              </div>

              <div className="mb-3 flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow">
                <Checkbox id='pfilerequestable' className='mt-[2px]' onCheckedChange={(e:any) => setForm({...form, ['canRequest']: e?true:false})}/>
                <label className="text-sm font-medium " htmlFor="pfilerequestable">
                  Requests<br/>
                  <p className='text-gray-500'>Make this file open to requests by others.</p>
                </label>
              </div>
              <Button type='submit' className='w-full mt-3 mb-[120px]' disabled={isUploadLoading}>
                {
                  isUploadLoading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                }
                Submit
              </Button>
            </div>
          </form>

      </DrawerContent>
    </Drawer>
      
    </>
  )
}

export default FileUploadButton