import { NextResponse } from "next/server";
import Lawyer from "@/models/lawyers";
import connectMongoDB from "@/lib/mongodb"

export async function POST(req){
    const { email, name, location, number, type, about,walletAddress } = await req.json();
    console.log({ email, name, location, number, type, about,walletAddress })
    let profileImage = `https://www.gravatar.com/avatar/${name}}?d=identicon`
    await connectMongoDB()
    const addLawyer = await Lawyer.create({email, walletAddress, about, name, location, profileImage, number, type, rating: 0, totalRatings: 0})
    console.log(addLawyer, "added lawyer")
    return NextResponse.json({message: "Successfully added lawyer", lawyerID: addLawyer._id}, {status: 200})
}