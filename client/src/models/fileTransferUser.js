import mongoose, {Schema} from "mongoose"

const fileTransferUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: { createdAt: 'created_at'}
  }
);

const  FileTransferUser = mongoose.models.FileTransferUser || mongoose.model("FileTransferUser", fileTransferUserSchema)

export default FileTransferUser;