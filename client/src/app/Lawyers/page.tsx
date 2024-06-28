"use client"
import { Input } from "@/components/ui/input"
import AdvocateCard from "../../components/AdvocateCard"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useEffect, useState } from "react"
import Link from "next/link"

const Page = () => {
    const [searchName, setSearchName] = useState('')

    const [lawyers, setLawyers] = useState([])

    const filterByName = () => {
        // setLawyers(lawyers.filter(lawyer => lawyer.name.includes(searchName)))
    }

    useEffect(() => {
        const getLawyers = async() => {

            const response = await fetch("/api/lawyers/getLawyers",{
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            response.json().then(res => {
                setLawyers(res.lawyers)
            })
            // console.log(response)
        }
        getLawyers();
    }, [])

    // const [lawyers, setLawyers] = useState([
    //     {
    //         name: "John Doe",
    //         type: "Bankruptcy lawyer",
    //         number: "+91 12658495625",
    //         email: "johmdoe@gmail.com",
    //         cases: 500,
    //         lawyerImg: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         name: "Rahul Kumar",
    //         type: "Corporate lawyer",
    //         number: "+91 89658758622",
    //         email: "rahulll@gmail.com",
    //         cases: 500,
    //         lawyerImg: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         name: "Sanjay Bangar",
    //         type: "Immigration lawyer",
    //         number: "+91 12658495625",
    //         email: "johmdoe@gmail.com",
    //         cases: 500,
    //         lawyerImg: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     }
    // ])
    return(
        <>
            <h1 className="text-lg mt-5 font-medium mb-5" >Select type of search</h1>
            <Button><Link href="/Lawyers/find">Find a lawyer</Link></Button>
            <Button className="ml-2"><Link href="/Lawyers/register">Register as a lawyer</Link></Button>
        </>
    )
}
export default Page