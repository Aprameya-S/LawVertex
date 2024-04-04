import FileTransferUser from '@/models/fileTransferUser'
import connectMongoDB from "@/lib/mongodb"
import {NextResponse} from "next/server"

export async function GET(request) {
  await connectMongoDB();
  const users = await FileTransferUser.find()
  
  return NextResponse.json(users, {status: 201})
}