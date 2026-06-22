import {Schema,model} from "mongoose";

const paymentSchema = new Schema({
    receiverId: {
      type: String,
    },
      userId: {
      type: String,
    },
      receiver: {
      type: String,
    },
      userName: {
      type: String,
    },
    amount : {
        type : Number,
        trim : true
    },
      paymentDetail : {
        type : String,

    },
      country : {
        type : String,

    }
},{timestamps:true});

const PaymentModel = model("Payments",paymentSchema);

export default PaymentModel;