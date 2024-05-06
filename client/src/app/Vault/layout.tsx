"use client"
import Link from "next/link";
import FileUploadButton from '@/components/FileUploadButton';
import { usePathname } from "next/navigation";
import FileTransferConnect from "@/components/FileTransferConnect";
import { VaultLinks } from "@/lib/links"

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  let path = usePathname()
  path='/'+path.split('/').splice(1,2).join('/')
  if(path==='/Vault/file'){
    path='/Vault'
  }


  return (
    <>
    <FileTransferConnect>
      <nav className='hidden lg:grid pr-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[230px] content-start fixed border-slate-200 dark:border-zinc-800 '>
        <FileUploadButton />
        {
          VaultLinks.map((item,index) => (
            <Link key={index} href={item.href} className={`text-[14px] py-1 hover:text-slate-800 flex gap-2  items-center ${(path===item.href)?'text-black dark:text-white font-semibold':'font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white '}`}>
              {item.icon}
              {item.title}
            </Link>
          ))
        }
      </nav>
      <main className="lg:ml-[270px] mt-[18px] min-h-[calc(100vh-150px)]">
          {children}
      </main>
    </FileTransferConnect>

    </>
  )
}

export default Layout