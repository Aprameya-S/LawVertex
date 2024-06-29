import { NextResponse } from "next/server";
import Lawyer from "@/models/lawyers";
import LawyerReview from "@/models/review"
import connectMongoDB from "@/lib/mongodb"

export async function POST(req){
    const { lawyerWalletAddress } = await req.json()
    await connectMongoDB()
    // console.log(lawyerID)
    const lawyerDetails = await Lawyer.find({walletAddress: lawyerWalletAddress})
    let lawyerID = lawyerDetails[0]['_id']+""
    const reviews = await LawyerReview.find({lawyerID})
    console.log(lawyerDetails)
    return NextResponse.json({lawyerDetails, reviews, message: "Successfully fetched lawyer"}, {status :200})
}