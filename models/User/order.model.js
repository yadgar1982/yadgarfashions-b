import {Schema,model} from "mongoose";

const orderSchema = new Schema({
    sizingType: {
      type: String,
      trim: true
    },
    refSizeId: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    refSizeModel: {
      type: String,
      enum: ["Mensize", "Womensize", "Coatsize"]
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
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
    productCost: {
      type: Number,
      required: true,
      trim: true
    },
    productImage: {
      type: String,
      required: true,
      trim: true
    },
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productRealPrice: {
      type: Number,
      required: true,
      trim: true
    },
    productColor: {
      type: String,
      required: true,
      trim: true
    },
    deliveryType: {
      type: String,
      required: true,
      trim: true
    },
    productSize: {
      type: String,
      required: true,
      trim: true
    },
    productQty: {
      type: Number,
      required: true,
      trim: true
    },
    totalPrice: {
      type: Number,
      trim: true
    },
    userAddress: {
      type: String,
      trim: true
    },
    paymentStatus: {
      type: String,
      required: true,
      trim: true
    },
    paymentId: {
      type: String,
      required: true,
      trim: true
    },
    status: {
        type: String,
        trim: true,
        default: "pending"
    },
    statusDetails: {
      type: [{}],
    },
    refundAmount: {
        type: Number,
        trim: true,
        default: 0
    },
    orderId: {
        type: Number,
        trim: true
    },
    isRated: {
        type: Boolean,
        trim: false
    },
},{timestamps:true});

const OrderModel = model("Order",orderSchema);

export default OrderModel;