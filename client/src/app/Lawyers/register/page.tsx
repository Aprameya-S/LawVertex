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
import PageTitle from "@/components/PageTitle"
import { ethers } from "ethers"
import { toast } from "react-toastify"
const Page = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [cases, setCases] = useState()
    const [about, setAbout] = useState()
    const [url, setURL] = useState()
    const [location, setLocation] = useState()
    const [type, setType] = useState()
    const [number, setNumber] = useState()
    

    const handleAddLawyer = async(e:any) => {
        e.preventDefault()
        try {
            const { ethereum } = window;
            if (!ethereum) return toast("Please install MetaMask.", {toastId: 'metamaskPrompt'});

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            //uncomment below line to propmt metamask connection automatically
            let request = await provider.send("eth_requestAccounts", []);
            const accounts = await ethereum.request({method: 'eth_accounts'})
            if(!accounts)
                throw("Error connecting to wallet")

            const response = await fetch("/api/lawyers/addLawyer", {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name, email,walletAddress: accounts[0], cases,about,profileImage: url, location, type, number, 
                })
            })
            const res = await response.json()
            console.log(res.lawyerID)
            redirect(`/${res.lawyerID}`)
            
        } catch (error) {
            
        }
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
            <PageTitle>Register as a Lawyer</PageTitle>

            <div className="w-full mt-4">
                <form onSubmit={handleAddLawyer} action="" className="">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e:any)=>setName(e.target.value)} className="mb-3" />
                    <Label>Profile Photo URL</Label>
                    <Input value={url} onChange={(e:any)=>setURL(e.target.value)}  className="mb-3" />
                    <Label>Email</Label>
                    <Input value={email} onChange={(e:any)=>setEmail(e.target.value)}  className="mb-3" />
                    <Label>Mobile Number</Label>
                    <Input value={number} onChange={(e:any)=>setNumber(e.target.value)}  className="mb-3" />
                    <Label>About</Label>
                    <Textarea value={about} onChange={(e:any) => setAbout(e.target.value)} className="mb-3"/>
                    <Label>Location</Label>
                    <Input value={location} onChange={(e:any)=>setLocation(e.target.value)}  className="mb-3" />
            
                    <Label>Type of Lawyer</Label>
                    <br/>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className="bg-transparent mb-3 mt-1">
                            <Button variant="outline" className=" w-full bg-transparent "> {type ? type : "Select the type of lawyer"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mb-10">
                            <DropdownMenuLabel>Type of lawyer</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={type} className="" onValueChange={(val:any)=>setType(val)}>
                                {
                                    lawyerTypes.map((lawyerType:any, index:number) => <DropdownMenuRadioItem key={index} value={lawyerType}>{lawyerType}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <br/>
                 
       
                    <Button className="">Submit details</Button>
                </form>
            </div>
        </>
    )
}
export default Page