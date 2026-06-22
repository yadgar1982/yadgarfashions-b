import { Schema, model } from "mongoose";

const authUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "user", "supplier",'dealer',"employee"],
      required: true,
      trim: true
    },
    refId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    refModel: {
      type: String,
      required: true,
      enum: ["Branding", "Supplier", "User","Dealer","Employee"]
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const AuthUserModel = model("AuthUser", authUserSchema);
export default AuthUserModel;
