import FileTransferUser from '@/models/fileTransferUser'
import connectMongoDB from "@/lib/mongodb"
import {NextResponse} from "next/server"

export async function POST(request) {
  const {address} = await request.json()
  await connectMongoDB();
  const user = await FileTransferUser.findOne({address:address})
  
  return NextResponse.json({addressExists:user?true:false}, {status: 201})
  
}