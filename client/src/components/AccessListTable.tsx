import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { revokeAccess, viewAccessList } from '@/hooks/useFileTransferContract'
import Loader from './Loader'

interface Props {
  accessList: Array<any>,
}
const AccessListTable = (props:Props) => {
  const [isRevokeLoading, setIsRevokeLoading] = useState(false)
  const [accessList, setAccessList] = useState<any>([])

  // console.log(props.accessList)


  const handleRevokeAccess = async(publicid:string,userAddress:string,index:number) => {
    try {
      setIsRevokeLoading(true)
      await revokeAccess({publicid,userAddress})
      let newAccessList = accessList.toSpliced(index,1);
      setAccessList(newAccessList)
      setIsRevokeLoading(false)
    } catch (error) {
      console.log(error)
      setIsRevokeLoading(false)
    }
  }

  // console.log(props.users)

  return (
    <>

        <div className="overflow-x-scroll w-full">
          <table className='text-sm border-2 border-input rounded-md block min-w-[700px]'>
          <thead className='text-left w-full border-b-2 border-input'>
            <tr className='w-full grid grid-cols-[35px_1fr_2fr_2fr_70px_20px] px-3 py-2 items-center'>
              <th className='w-5'></th>
              <th>Name</th>
              <th>Address</th>
              <th>Public Id</th>
              <th>Valid</th>
              <th className='w-5'></th>
            </tr>
          </thead>
          <tbody className='text-left w-full'>
            {props.accessList.map((item:any,index:number) => (
              <tr key={index} className='odd:bg-transparent/5 dark:odd:bg-[#19191c] w-full grid grid-cols-[35px_1fr_2fr_2fr_70px_20px] px-3 py-2 items-center'>
                <td className='pr-3'>
                  <Button onClick={(e) => handleRevokeAccess(item.publicid,item.user,index)} disabled={isRevokeLoading} variant='destructive' size='icon' className='h-6 w-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-minus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                  </Button>
                </td>
                <td className="font-medium pr-3">{item.username}</td>
                <td className='truncate pr-3'>{item.user}</td>
                <td className='truncate pr-3'>{item.publicid}</td>
                <td className='pr-3'>{item.valid?'True':'False'}</td>
                <td className='text-blue-600 w-5 pr-3'>
                  {
                    item.viewonly ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )
                  }
                </td>
                
              </tr>
            ))}
            
          </tbody>
          </table>
        </div>
      
    </>
  )
}

export default AccessListTable