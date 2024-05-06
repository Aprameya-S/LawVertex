"use client"
import CaseCard from '@/components/CaseCard'
import CaseNumberSearch from '@/components/CaseNumberSearch'
import PageTitle from '@/components/PageTitle'
import PublicDocuments from '@/components/PublicDocuments'
import React, { useState } from 'react'

const Page = () => {
  const [caseData, setCaseData] = useState<any>({})
  console.log(caseData)
  return (
    <>
    <PageTitle>Search Court Orders</PageTitle>
    <CaseNumberSearch setCaseData={setCaseData}/>

    {
      caseData.cnr &&
      <main>
        <CaseCard CNR={caseData.cnr}/>
        <PublicDocuments CNR={caseData.cnr} types={["Interim Orders","Final Orders","Judgements"]}/>
      </main>
    }
    </>
  )
}

export default Page