import { NextResponse } from "next/server";
import Lawyer from "@/models/lawyers";
import connectMongoDB from "@/lib/mongodb"

export async function POST(req){
    const { email, name, location, profileImage, number, type, cases, about } = await req.json();
    await connectMongoDB()
    const addLawyer = await Lawyer.create({email, about, name, location, profileImage, number, type, cases, rating: 0, totalRatings: 0})
    console.log(addLawyer, "added lawyer")
    return NextResponse.json({message: "Successfully added lawyer", lawyerID: addLawyer._id}, {status: 200})
}