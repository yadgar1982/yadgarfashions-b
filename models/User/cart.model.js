import {Schema,model} from "mongoose";

const cartSchema = new Schema({
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },
    dealerId: {
      type: Schema.Types.ObjectId,
      ref: "Dealer"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    refSizeId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    refSizeModel: {
      type: String,
      enum: ["Womensize", "Mensize","Coatsize"]
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productQty: {
      type: Number,
      required: true,
      trim: true
    },
    productUnit: {
      type: Number,
      required: true,
      trim: true
    },
    productCost: {
      type: Number,
      required: true,
      trim: true
    },
    deliveryCost: {
      type: Number,
      required: true,
      trim: true
    },
    saleTax: {
      type: Number,
      default:0
    },
     otherTax: {
      type: Number,
      default:0
    },
    deliveryCostUnit: {
      type: Number,
      required: true,
      trim: true
    },
    deliveryType: {
      type: String,
      required: true,
      trim: true
    },
    productRealPrice: {
      type: Number,
      required: true,
      trim: true
    },
    productDiscountPercent: {
      type: Number,
      required: true,
      trim: true
    },
    productFinalPrice: {
      type: Number,
      required: true,
      trim: true
    },
    productSize: {
      type: String,
      required: true,
      trim: true
    },
    productColor: {
      type: String,
      required: true,
      trim: true
    },
    sizingType: {
      type: String,
      required: true,
      trim: true
    },
    productImage: {
      type: String,
      trim: true
    },
},{timestamps:true});

const CartModel = model("Cart",cartSchema);

export default CartModel;