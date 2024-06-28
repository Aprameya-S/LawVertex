import mongoose, {Schema} from "mongoose"

const LawyerReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true
    },
    review: {
        type: String,
        required: true
    },
    lawyerID: {
        type: String,
        required: true
    }
  },
  {
    timestamps: { createdAt: 'created_at'}
  }
);

const  LawyerReview = mongoose.models.LawyerReview || mongoose.model("LawyerReview", LawyerReviewSchema)

export default LawyerReview;