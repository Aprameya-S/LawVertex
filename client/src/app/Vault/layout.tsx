"use client"
import Link from "next/link";
import FileUploadButton from '@/components/FileUploadButton';
import { usePathname } from "next/navigation";
import FileTransferConnect from "@/components/FileTransferConnect";

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
      title:"Received Files",
      href:"/Vault/receivedFiles"
    },
    {
      title:"Manage Access",
      href:"/Vault/manageAccess"
    },
    {
      title:"Access Requests",
      href:"/Vault/accessReq"
    }
  ]
  let path = usePathname()
  path='/'+path.split('/').splice(1,2).join('/')
  if(path==='/Vault/file'){
    path='/Vault'
  }


  return (
    <>
    <FileTransferConnect>
      <nav className='grid pr-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[260px] content-start fixed border-slate-200 dark:border-zinc-800 '>
        <FileUploadButton />
        {
          links.map((item,index) => (
            <Link key={index} href={item.href} className={`pl-[10px] border-l-2  text-[14px] py-1 hover:text-slate-800 hover:border-slate-500  ${(path===item.href)?'text-black dark:text-white font-semibold border-blue-600 hover:border-blue-600 dark:hover:border-blue-600':'border-slate-300 font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'}`}>
              {item.title}
            </Link>
          ))
        }
      </nav>
      <main className="ml-[300px] mt-[18px] min-h-[calc(100vh-150px)]">
          {children}
      </main>
    </FileTransferConnect>

    </>
  )
}

export default layout