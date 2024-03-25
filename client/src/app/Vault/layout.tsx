import React from 'react'
import Link from "next/link";
import FileUploadButton from '@/components/FileUploadButton';


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const links = [
    {
      title:"Personal Storage",
      href:"/Vault",
    },
    {
      title:"Sent Files",
      href:"/Vault/sentFiles"
    },
    {
      title:"Received Files",
      href:"/Vault/receivedFiles"
    },
    {
      title:"Manage Access",
      href:"/Vault/access"
    },
    {
      title:"Access Requests",
      href:"/Vault/accessReq"
    }
  ]

  return (
    <>
    <nav className='grid pr-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[260px] content-start fixed border-slate-200 dark:border-zinc-800 '>
      <FileUploadButton />
      {
        links.map((item,index) => (
          <Link key={index} href={item.href} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>
            {item.title}
          </Link>
        ))
      }
    </nav>
    <main className="ml-[300px] mt-[18px] min-h-[calc(100vh-150px)]">
      {children}
    </main>
    </>
  )
}

export default layout