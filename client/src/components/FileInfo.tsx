import React from 'react'
import fileIcon from '../../public/images/fileIcon.png'
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
interface  PropsType {
  owner: string;
  name: string;
  desc: string;
  format: string;
  size:string;
  createAt: string;
  publicid:string;
  cid: string;
  encrypted: boolean;
  searchable: boolean;
  canRequest: boolean;
  exists: boolean;
}

const FileInfo = ({file}:{file:PropsType}) => {
  // console.log(file)
  return (
    <div className='border-b-2 sm:border sm:bg-secondary border-input relative sm:rounded-xl sm:p-6 pb-6 overflow-hidden '>
      <div className="flex justify-between">
        <h1 className='font-medium text-lg sm:text-2xl grid grid-cols-[12px_1fr] sm:grid-cols-[20px_1fr] items-bottom gap-2 items-center'>
          <Image
          src={fileIcon}
          alt="File Icon"
          className='w-3 sm:w-5'
          />
          {file.name}
        </h1>

        <div className="flex gap-2 items-center">
          {
            file.encrypted && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            )
          }
          {
            file.searchable ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-check"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-check"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            )
          }
          {
            file.canRequest && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send rotate-180"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            )
          }

        </div>
      </div>
      

      <p className='sm:font-medium text-[15px] mb-4 mt-1'>{file.desc}</p>
      <div className='text-[13px] mb-2 w-full text-nowrap w-100px flex flex-nowrap items-center gap-1'> 
      <Button onClick={() => {navigator.clipboard.writeText(file.owner)}} className='p-0 scale-75' variant='secondary' size={'icon'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy text-primary"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      </Button>
        <p className='overflow-hidden overflow-ellipsis'>Owner: {file.owner}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant='outline'>Created: {file.createAt}</Badge>
        <Badge variant='outline'>Size: {file.size}</Badge>
        <Badge variant='outline'>Format: {file.format}</Badge>
      </div>
    </div>
  )
}

export default FileInfo