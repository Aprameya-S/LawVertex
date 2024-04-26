"use client"
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Page = () => {

  const handleSearch = (e:any) => {
    e.preventDefault();
  }

  return (
    <>
    <PageTitle>Search by CNR Number</PageTitle>
    <form onSubmit={handleSearch} className="flex gap-3">
      <Input type='text' placeholder='16-digit CNR Number' required/>
      <Button>Search</Button>
    </form>
    </>
  )
}

export default Page