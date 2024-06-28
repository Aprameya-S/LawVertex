import FileTransferUser from '@/models/fileTransferUser'
import connectMongoDB from "@/lib/mongodb"
import {NextResponse} from "next/server"

export async function POST(request) {
    const {name,address,email} = await request.json()
    await connectMongoDB();
    const user = FileTransferUser.findOne({email:email})
    // console.log("USER:",user)
    
    await FileTransferUser.create({name,address,email})
    return NextResponse.json({message: "User created"}, {status: 201})
}