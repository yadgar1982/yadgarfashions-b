import {Schema,model} from "mongoose";

const ratingSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    orderId: {
      type: Number,
    },
    fullname: {
      type: String,
      required: false,
      trim: true
    },
    comment: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      required: true
    },
    profile: {
      type: String
    }
},{timestamps:true});

const RatingModel = model("Rating",ratingSchema);

export default RatingModel;