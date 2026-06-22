import {Schema,model} from "mongoose";

const userSchema = new Schema({
    fullname: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    mobile: {
      type: String,
      required: false,
      trim: true
    },
    dob: {
      type: String,
      required: false,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true,
      lowercase : true
    },
    profilePic : {
        type : String,
        trim : true
    },
    status: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

const UserModel = model("User",userSchema);

export default UserModel;