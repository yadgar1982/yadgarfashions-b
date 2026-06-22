import {Schema,model} from "mongoose";

const dealerTrHistorySchema = new Schema(
  {
    dealerId: {
      type: Schema.Types.ObjectId,
      ref: "Dealer",
      required: true
    },
    orderId : Number,
    quantity : Number,
    amount : Number,
    type : String,
  },
  { timestamps: true }
);

const DealerTrHistoryModel = model("DealerTrhistory",dealerTrHistorySchema)
export default DealerTrHistoryModel;
