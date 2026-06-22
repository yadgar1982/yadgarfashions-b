import {Schema,model} from "mongoose";

const addressSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    zipcode: {
      type: Number,
      required: true,
      trim: true
    },
    streetAddress: {
      type: String,
      required: true,
      trim: true
    }
},{timestamps:true});

const AddressModel = model("Address",addressSchema);

export default AddressModel;