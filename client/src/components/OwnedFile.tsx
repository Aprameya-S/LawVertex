import React,{useState,useEffect} from 'react'
import fileIcon from '../../public/images/fileIcon.png'
import Image from 'next/image';
import { Card } from './ui/card';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { deleteFile } from '@/hooks/useFileTransferContract';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from 'next/link';

interface Props {
  key:number;
  listView:boolean;
  file:any;
  refreshData:any;
}



const OwnedFile = (props:Props) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async(e:any) => {
    e.stopPropagation()
    try {
      setIsDeleteLoading(true);
      await deleteFile(props.file.publicid)
      .then(()=>{
        toast({
          title: "Delete successful!",
          description: "The file has been permanently removed for everyone who had access to it.",
        })
        props.refreshData();
      })
      setIsDeleteLoading(false);
    } catch (error) {
      setIsDeleteLoading(false);
      console.log(error)
    }
  }

  return (
    <Link href={`/Vault/file/${props.file.publicid}`}>
    <Card className='border-input w-full p-[15px] bg-transparent overflow-hidden border-[2px] hover:border-[#4A92FE] cursor-pointer relative h-[150px]'>
      <div className="flex justify-between items-center">
        <div className="flex h-fit gap-2 items-end">
          <Image
            src={fileIcon}
            alt="file"
            width={16}
            className='self-end'
          />
          <p className='text-[15px] font-medium self-end mb-[-4px] line-clamp-1 overflow-hidden'>{props.file.name}</p><br/>
        </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e)=>{e.stopPropagation()}}>
              <Button variant='outline' size="icon" className='p-1 bg-transparent' onClick={(e)=>{e.stopPropagation()}}>
                <DotsVerticalIcon className='h-4 w-4'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-input'>
              <DropdownMenuItem onClick={(e)=>{e.stopPropagation()}}>Manage Access</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                {
                  isDeleteLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                }
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        
      </div>
      <p className='line-clamp-2 mt-2 text-[13px] overflow-hidden text-gray-500'>{props.file.desc}</p>
      <div className="flex gap-3 mt-3">
        <Badge variant="secondary">{props.file.size}</Badge>
        <Badge variant="secondary">{props.file.createdAt}</Badge>
      </div>
    </Card>
    </Link>
  )
}

export default OwnedFile