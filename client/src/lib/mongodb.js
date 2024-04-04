import mongoose from "mongoose"

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
    console.log("Connected to mongodb...")
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB