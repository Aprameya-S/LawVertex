"use client"
import React,{ useCallback, useState, useRef } from 'react'
import { ReloadIcon, UploadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useStorageUpload } from '@thirdweb-dev/react';
import { useDropzone } from "react-dropzone"
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



// function get_blob_from_string (string, type, name) {
//   let array = new Uint8Array(string.length);
//   for (let i = 0; i < string.length; i++){
//       array[i] = string.charCodeAt(i);
//   }
//   let end_file = new Blob([array], {type: type, name: name});
//   let a = document.createElement("a");
//   a.href = URL.createObjectURL(end_file);
//   a.download = name;
//   a.target = "_blank";
//   a.click();
// }

const FileUploadButton = () => {
  const { toast } = useToast()
  const [file, setFile] = useState<File[]>([])
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    desc:'',
    size:'',
    createAt: '',
    publicid:'',
    cid: '',
    searchable: false,
    canRequest: false
  })
  const submitBtnRef = useRef<HTMLButtonElement>(null)
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
  
      const uri = await upload({
        data: file
      })
      // console.log('uploaded', uri)
      
      form.size=convertBytes(file[0].size.toString())
      form.createAt=new Date().toJSON().slice(0,10)
      form.cid=uri[0]
      form.publicid=generateId(40)
      form.name=file[0].name
      // console.log(form)
  
      await addFile(form)
      .then(() => {
        toast({
          title: "Pinned on IPFS",
          // action: <ToastAction altText="View">View</ToastAction>,
        })
      })
      .then(() => {
        setForm({
          name: '',
          desc:'',
          size:'',
          createAt: '',
          publicid:'1234',
          cid: '',
          searchable: false,
          canRequest: false
        })
        submitBtnRef.current?.click()
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

  // console.log(file)

  return (
    <>
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='mb-5' >
          <UploadIcon className="mr-2 h-4 w-4"/>
          Upload File
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='grid w-full justify-items-center'>
          <DrawerClose className='w-fit' asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <DrawerTitle className='pt-4'>Upload File</DrawerTitle>
          <DrawerDescription className='pb-4'>This action will trigger wallet transaction.</DrawerDescription>
        </DrawerHeader>

          <form onSubmit={handleSubmit} className="grid w-full justify-center gap-1.5  overflow-y-auto">
            <div className="" {...getRootProps()}>
              {/* <Label htmlFor="file">Files</Label> */}
              <Input {...getInputProps()} id="file" type="file" required/>
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
                        <Button>Select file</Button>
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
                <Checkbox id='pfilesearchable' className='mt-[2px]' onCheckedChange={(e) => setForm({...form, ['searchable']: e?true:false})}/>
                <label className="text-sm font-medium " htmlFor="pfilesearchable">
                  Searchable<br/>
                  <p className='text-gray-500'>Make this file searchable by others.</p>
                </label>
              </div>

              <div className="mb-3 flex flex-row items-start space-x-3 space-y-0 rounded-md border border-input p-4 shadow">
                <Checkbox id='pfilerequestable' className='mt-[2px]' onCheckedChange={(e) => setForm({...form, ['canRequest']: e?true:false})}/>
                <label className="text-sm font-medium " htmlFor="pfilerequestable">
                  Requests<br/>
                  <p className='text-gray-500'>Make this file open to requests by others.</p>
                </label>
              </div>
              <Button type='submit' className='w-full mt-3 mb-[120px]' disabled={isUploadLoading}>
                {
                  isUploadLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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