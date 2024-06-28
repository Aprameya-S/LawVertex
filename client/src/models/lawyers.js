import mongoose, {Schema} from "mongoose"

const LawyerSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cases: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    totalRatings: {
        type: Number,
        required: true,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at'}
  }
);

const  Lawyer = mongoose.models.Lawyer || mongoose.model("Lawyer", LawyerSchema)

export default Lawyer;