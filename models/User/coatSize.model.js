import { Schema, model } from "mongoose";

const coatSizeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    heightSize: {
      type: String,
      required: false,
      trim: true,
    },
    shoulderSize: {
      type: String,
      required: false,
      trim: true,
    },
    neckSize: {
      type: String,
      required: false,
      trim: true,
    },
    armholeSize: {
      type: String,
      required: false,
      trim: true,
    },
    bustSize: {
      type: String,
      required: false,
      trim: true,
    },
    waistSize: {
      type: String,
      required: false,
      trim: true,
    },
    hipsSize: {
      type: String,
      required: false,
      trim: true,
    },
    otherDetails: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const CoatSizeModel = model("Coatsize", coatSizeSchema);

export default CoatSizeModel;
