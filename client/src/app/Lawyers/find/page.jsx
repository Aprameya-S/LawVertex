"use client"
import { Input } from "@/components/ui/input"
import AdvocateCard from "../../../components/AdvocateCard"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
const Page = () => {
    const [searchName, setSearchName] = useState('')

    const [lawyers, setLawyers] = useState([])
    const [filterSearch, setFilterSearch] = useState([])
    const [lawyerTypeFilter, setLawyerTypeFilter] = useState()
    // const [isFiltererd]
    useEffect(() => {
        const getLawyers = async() => {

            const response = await fetch("/api/lawyers/getLawyers",{
                method: 'GET',
                headers: {
                    'content-type': 'application/json' 
                }
            })
            response.json().then(res => {
                console.log(res.lawyers)
                setFilterSearch(res.lawyers)
                setLawyers(res.lawyers)
            })
            // console.log(response)
        }
        getLawyers();
    }, [])

    const filterByName = () => {
        // clear all filters to default
        setLawyerTypeFilter()

        lawyers.map(law => console.log(law.name))
        console.log(lawyers.filter(law => law.name.toLowerCase().includes(searchName)))
        setFilterSearch(lawyers.filter(lawyer => lawyer.name.includes(searchName)))
    }

    const handleClearFilters = () => {
        setLawyerTypeFilter()

        setSearchName("")
        setFilterSearch(lawyers)
    }

    // a new lawyer type filter is selected
    useEffect(() => {
        setFilterSearch(lawyers)
        if(lawyerTypeFilter){
            setFilterSearch(prev => prev.filter(lawyer => lawyer.type === lawyerTypeFilter))
        }
    }, [lawyerTypeFilter])

    const lawyerTypes = [
        "Bankruptcy",
        "Corporate",
        "Constitutional",
        "Criminal defense",
        "Employment and labor",
        "Entertainment",
        "Estate planning",
        "Family",
        "Immigration",
        "Intellectual property",
        "Personal injury",
        "Tax",
    ]

    
    return(
        <>
            <h1 className="text-lg mt-5 font-medium">Advocates</h1>
            <div className="relative w-full mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-[10px] top-2.5 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <div className="flex gap-5">
                    <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} className="pl-8" type="text" placeholder="Search advocates by name" />
                    <button onClick={filterByName} className="px-5 py-2 ml-2 rounded-md text-sm bg-blue-600 text-white">Filter</button>

                </div>
                <div className="mt-3">
                    <DropdownMenu className="w-20">
                        <DropdownMenuTrigger className="">
                            <Button size="sm" variant="outline" className="w-full"> {lawyerTypeFilter ? lawyerTypeFilter : "Select the type of lawyer"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuLabel>Type of lawyer</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={lawyerTypeFilter} onValueChange={setLawyerTypeFilter}>
                                {
                                    lawyerTypes.map(type => <DropdownMenuRadioItem value={type}>{type}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleClearFilters} size="sm" className="ml-2" >X</Button>
                </div>
            </div>
            {/* <div className="flex justify-end mt-3">
                <h1>Sort by</h1>
               
            </div> */}
            
            <div className="grid grid-cols-2 gap-5 mt-5">
                {
                    filterSearch.length > 0 ? filterSearch.map(({name, type, number, email, cases, profileImage, _id, rating, totalRatings}, index) => <AdvocateCard key={index} lawyerImg={profileImage} type={type} name={name} number={number} email={email} id={_id} cases={cases} rating={rating/totalRatings} /> ) : (
                        <div>
                            <h1>No such lawyers found</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default Page