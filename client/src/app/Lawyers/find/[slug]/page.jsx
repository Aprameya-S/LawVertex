"use client"
import { useParams } from "next/navigation"
import LawyerReview from "../../../../components/LawyerReview" 
import { Button } from "@/components/ui/button"
import { Drawer, DrawerTitle, DrawerClose, DrawerHeader, DrawerTrigger, DrawerContent } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
export default function Page(){
    const {slug} = useParams()
    const [rating, setRating] = useState()
    const[title, setTitle] = useState()
    const[review, setReview] = useState()


    const [reviews, setReviews] = useState([])
    const [lawyerDetails, setLawyerDetails] = useState()

    useEffect(() => {
        const getLawyerDetailsAndReviews = async() => {
            const response = await fetch("/api/lawyers/getSingleLawyer", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    lawyerID: slug
                })
            })
            const res = await response.json()
            console.log(res)
            setReviews(res.reviews)
            setLawyerDetails(res.lawyerDetails[0])

        }
        getLawyerDetailsAndReviews()
        
    }, [])

    const handleReviewSubmit = async(e) => {
        e.preventDefault()
        const reviewDetails = {title, rating, review}
        // send api POST req
        const addReview = await fetch('/api/lawyers/addReview', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              rating,
              title,
              review,
              name: "Joshua Tauro",
              lawyerID: slug
            })
          })
        const response = await addReview.json()
        if(response.isCompleted){
            toast("Successfully added review")
            setTitle("")
            setRating(0)
            setReview("")
        }
    }


    return(
        <div className="">
            <div className="flex gap-3">
                    <img src={lawyerDetails?.profileImage} className=" h-12 w-12 rounded-full" alt="" />
                    <div className="">
                        <div className="flex items-center">
                            <h1 className="text-medium mr-2 font-medium">{lawyerDetails?.name}</h1>
                            <p className="text-sm">({lawyerDetails?.rating/lawyerDetails?.totalRatings}⭐)</p>
                        </div>
                        <p className="text-gray-400 text-sm font-semibold">{lawyerDetails?.type}</p>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="font-medium mb-1">About me</h2>
                    <p className="text-gray-400 text-sm font-medium mr-5 bg-red-500">{lawyerDetails?.about}</p>
                </div>
                <h2 className="font-medium mt-5 mb-1">My Experience</h2>
                <div className="flex font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Cases fought: </p>
                    <p className="">{lawyerDetails?.cases}</p>
                </div>
                <div className="flex mt-1 font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Contact number: </p>
                    <p className="">+91 {lawyerDetails?.number}</p>
                </div>
                <div className="flex mt-1 font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Email: </p>
                    <p className="">{lawyerDetails?.email}</p>
                </div>
                <h2 className="font-medium mt-5 mb-2">My Reviews</h2>
                
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="text-xs mb-5">
                            <h1>Add review</h1>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='grid w-full justify-items-center'>
                        <DrawerClose className='mt-4 w-fit' asChild>
                            <Button size='sm' variant="outline">Cancel</Button>
                        </DrawerClose>
                        <DrawerHeader>
                            <DrawerTitle>Add your review</DrawerTitle>
                        </DrawerHeader>
                        <form action="" onSubmit={handleReviewSubmit} className=" mb-20 py-5">
                            <Label>Title</Label>
                            <Input value={title} onChange={e => setTitle(e.target.value)} className="mb-5  w-96" />
                            <Label className="">Rating</Label>
                            <br/>
                            <DropdownMenu className="w-full">
                                <DropdownMenuTrigger className="w-full">
                                    <Button size="sm" variant="outline" className="w-full">{rating ? rating : "Select a rating"}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                <DropdownMenuLabel>Rating</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={rating} onValueChange={setRating}>
                                        <DropdownMenuRadioItem value="1">⭐</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="2">⭐⭐</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="3">⭐⭐⭐</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="4">⭐⭐⭐⭐</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="5">⭐⭐⭐⭐⭐</DropdownMenuRadioItem>

                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <br/>
                            <br/>
                            <Label className="mt-5">Review</Label>
                            <Textarea value={review} onChange={e => setReview(e.target.value)} />
                            <Button size="sm" className="mt-5 w-full">Submit review</Button>
                        </form >
                    </DrawerContent>
                </Drawer>
                <div className="grid grid-cols-2 gap-10 ">
                    {reviews.map(({name, title, review, rating}) => <LawyerReview title={title} name={name} rating={rating} review={review} />)}

                </div>
        </div>
    )
}