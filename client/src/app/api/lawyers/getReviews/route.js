import connectMongoDB from "@/lib/mongodb"
import {NextResponse} from "next/server"
import LawyerReview from '@/models/review'
export async function POST(request){
    const { lawyerID } = await request.json();
    await connectMongoDB()
    const reviews = LawyerReview.find({lawyerID})

    return NextResponse.json({reviews},{status: 200})

}