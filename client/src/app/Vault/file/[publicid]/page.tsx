"use client"
import React, { useEffect, useState } from 'react'
import { deleteFile, getOwnedFile } from '@/hooks/useFileTransferContract'
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { decryptfile } from '@/lib/decryptFile';
import MultiMediaRenderer from '@/components/MultiMediaRenderer';
import FileInfo from '@/components/FileInfo';
import { useToast } from '@/components/ui/use-toast';


function readFile(input:any){
  const fr = new FileReader()
  fr.readAsDataURL(input)
  fr.addEventListener('load', () => {
    const res = fr.result
    // console.log(res)
  })
}

const page = ({ params }: { params: { publicid: string } }) => {
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState<any>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async(e:any) => {
    e.stopPropagation()
    try {
      setIsDeleteLoading(true);
      await deleteFile(file.publicid)
      .then(()=>{
        toast({
          title: "Delete successful!",
        })
      })
      setIsDeleteLoading(false);
    } catch (error) {
      setIsDeleteLoading(false);
      console.log(error)
    }
  }

  const  fetchData = async() => {
    try{
      const data = await getOwnedFile(params.publicid as string)
      .then((res) => {
        setFile({
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

        //if file is encrypted, decrypt and set url
        if(res[8]===true){
          fetch(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${res[7].split('//')[1]}`)
          .then((res) => res.blob())
          .then(blob => {
            readFile(blob)
            const nfile = new File([blob],res[1], {type : res[3]});
            // console.log(nfile)
            decryptfile(nfile,res[3],"password")
            .then((res) => {
              setFileUrl(res?.fileLink)
              // console.log(res)
            })
          })
          .then(() => {
            setIsLoading(false)
          })
        }
        else{
          setFileUrl(`https://b75d97dda9827edd7e665521bd610b09.ipfscdn.io/ipfs/${res[7].split('//')[1]}`)
          setIsLoading(false)
        }
      })
     
    } catch(error) {
      console.log(error)
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  console.log(fileUrl)

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <FileInfo file={file}/>
      {
        !file.encrypted && <MultiMediaRenderer url={fileUrl}/>
      }

      <div className="flex mt-5 gap-3">
        <a href={fileUrl} download={file.name}>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Download
          </Button>
        </a>

        <Button variant='destructive' size='icon' className='' onClick={handleDelete} disabled={isDeleteLoading}>
          {
            isDeleteLoading ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            )
          }
        </Button>
      </div>
{/* {file.publicid} */}
    </div>
  )
}

export default page