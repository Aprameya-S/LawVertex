import React from 'react'

const PageTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <h1 className='text-2xl mb-5 font-semibold'>
      {children}
    </h1>
  )
}

export default PageTitle