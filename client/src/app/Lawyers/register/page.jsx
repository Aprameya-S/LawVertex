"use client"
import { Input } from "@/components/ui/input"
import AdvocateCard from "../../../components/AdvocateCard"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"
const Page = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [cases, setCases] = useState()
    const [about, setAbout] = useState()
    const [url, setURL] = useState()
    const [location, setLocation] = useState()
    const [type, setType] = useState()
    const [number, setNumber] = useState()


    const handleAddLawyer = async(e) => {
        e.preventDefault()
        const response = await fetch("/api/lawyers/addLawyer", {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                name, email, cases,about,profileImage: url, location, type, number
            })
        })
        const res = await response.json()
        console.log(res.lawyerID)
        redirect(`/${res.lawyerID}`)
    } 

    

    const lawyerTypes = [
        "CLEAR",
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
            <h1 className="text-lg mt-5 font-medium mb-10">Register as a Lawyer</h1>
            <div className="w-full mt-10">
                <form onSubmit={handleAddLawyer} action="" className="mt-20 bg-blue-500">
                    <Label>Name</Label>
                    <Input value={name} onChange={e=>setName(e.target.value)} className=" w-44 mt-2 mb-5" />
                    <Label>Profile Photo URL</Label>
                    <Input value={url} onChange={e=>setURL(e.target.value)}  className="w-40 mt-2 mb-5" />
                    <Label>Email</Label>
                    <Input value={email} onChange={e=>setEmail(e.target.value)}  className="w-40 mt-2 mb-5" />
                    <Label>Mobile Number</Label>
                    <Input value={number} onChange={e=>setNumber(e.target.value)}  className="w-40 mt-2 mb-5" />
                    <Label>About</Label>
                    <Textarea value={about} onChange={e => setAbout(e.target.value)}/>
                    <Label>Location</Label>
                    <Input value={location} onChange={e=>setLocation(e.target.value)}  className="w-40 mt-2 mb-5" />
                    <br/>
                    <br/>
                    <Label>Type of Lawyer</Label>
                    <br/>
                    <DropdownMenu className="w-20">
                        <DropdownMenuTrigger className="">
                            <Button size="sm" variant="outline" className="w-full"> {type ? type : "Select the type of lawyer"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mb-10">
                            <DropdownMenuLabel>Type of lawyer</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={type} className="" onValueChange={setType}>
                                {
                                    lawyerTypes.map(lawyerType => <DropdownMenuRadioItem value={lawyerType}>{lawyerType}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <br/>
                    <Label className="mt-14">Cases Fought</Label>
                    <Input value={cases} onChange={e=>setCases(e.target.value)}  className="w-20 h-64 mt-2 mb-5"/>
                    <Button className="">Submit details</Button>
                </form>
            </div>
        </>
    )
}
export default Page