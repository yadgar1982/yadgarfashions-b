import {Schema,model} from "mongoose";

const productSchema = new Schema({
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    qty: {
      type: Number,
      required: true,
      trim: true
    },
    productCost: {
      type: Number,
      required: true,
      trim: true
    },
    realPrice: {
      type: Number,
      required: true,
      trim: true
    },
    discountPercent: {
      type: Number,
      required: true,
      trim: true
    },
    finalPrice: {
      type: Number,
      required: true,
      trim: true
    },
    expressDurationDays: {
      type: Number,
      required: true,
      trim: true
    },
    normalDurationDays: {
      type: Number,
      required: true,
      trim: true
    },
    productUnit: {
      type: Number,
      required: true,
      trim: true
    },
    clothSize: {
      type: [String],
      required: true,
      trim: true
    },
    clothColor: {
      type: [String],
      required: true,
      trim: true
    },
    highlights: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
      trim: true
    },
    sizingType: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: [String],
      trim: true
    },
},{timestamps:true});

const ProductModel = model("Product",productSchema);

export default ProductModel;