export const HeaderLinks = [
  {
    title:"Case Details",
    href:"CaseDetails" 
  },
  {
    title:"Vault",
    href:"Vault" 
  },
  {
    title:"Search Advocate",
    href:"Lawyers" 
  },
]

export const VaultLinks = [
  {
    title:"Personal Storage",
    href:"/Vault",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
  },
  {
    title:"Received Files",
    href:"/Vault/receivedFiles",
    icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
  },
  {
    title:"Manage Access",
    href:"/Vault/manageAccess",
    icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  },
  {
    title:"Request Files",
    href:"/Vault/requestFiles",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  }
]

export const AdminCaseDetailsLinks = [
  {
    title:"Add court",
    href:"/CaseDetails/addCourt"
  },
]

export const CourtsCaseDetailsLinks = [
  {
    title:"Add New Case",
    href:"/CaseDetails/addCase"
  },
  {
    title:"Update Case",
    href:"/CaseDetails/updateCase"
  },
  {
    title:"Add Act Violation",
    href:"/CaseDetails/addActViolation"
  },
  {
    title:"Add Proceeding",
    href:"/CaseDetails/addProceedingInfo"
  },
  {
    title:"Add Party",
    href:"/CaseDetails/addParty"
  },
  {
    title:"Add Advocates",
    href:"/CaseDetails/addAdvocate"
  },
  {
    title:"Upload Document",
    href:"/CaseDetails/uploadPublicDocs"
  },
]

export const CaseDetailsLinks = [
  {
    title:"Case Status",
    href:"/CaseDetails/caseStatus?page=case-details"
  },
  {
    title:"CNR Search",
    href:"/CaseDetails/cnrSearch?page=case-details"
  },
  {
    title:"Court Orders",
    href:"/CaseDetails/courtOrders"
  },
  {
    title:"Locate Court",
    href:"/CaseDetails/locateCourt"
  },
]

export const SearchLawyersLinks = [
  {
    title: "Home",
    href: "/Lawyers",
    icon: <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z" />
  </svg>
  },
  {
    title: "View all lawyers",
    href:"/Lawyers/find",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  }
]

export const RegisterLawyerLinks = [
  {
    title: "Home",
    href: "/Lawyers",
    icon: <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z" />
  </svg>
  },
  {
    title: "View all lawyers",
    href: "/Lawyers/find",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  }
]
