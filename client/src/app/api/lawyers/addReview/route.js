import connectMongoDB from "@/lib/mongodb"
import {NextResponse} from "next/server"
import LawyerReview from '@/models/review'
import Lawyer from "@/models/lawyers"
export async function POST(request) {
    const {name,title,rating,review, walletAddress} = await request.json()
    await connectMongoDB();
    const lawyerDetails = await Lawyer.find({walletAddress: walletAddress})
    let lawyerID = lawyerDetails[0]['_id']+""
    let profileImage = `https://www.gravatar.com/avatar/${name}?d=identicon`
    const la = await LawyerReview.create({name,title,rating, lawyerID, review, profileImage})

    await Lawyer.updateOne({_id: lawyerID}, {
        $inc: {rating, totalRatings: 1}
    })
    return NextResponse.json({ message: "Added review successfully", isCompleted: true}, {status: 201})
}