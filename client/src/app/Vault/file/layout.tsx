import React from 'react'
import Link from "next/link";
import FileUploadButton from '@/components/FileUploadButton';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <>
      {children}
    </>
  )
}

export default layout