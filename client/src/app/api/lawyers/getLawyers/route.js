import { NextResponse } from "next/server";
import Lawyer from "@/models/lawyers";
import connectMongoDB from "@/lib/mongodb"

export async function GET(req){
    await connectMongoDB()
    const lawyers = await Lawyer.find()
    return NextResponse.json({lawyers, message: "Successfully fetched all lawyers"}, {status :200})
}