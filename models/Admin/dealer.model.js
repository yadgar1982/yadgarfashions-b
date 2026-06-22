import {Schema,model} from "mongoose";

const dealerSchema = new Schema(
  {
    sn: {
      type: Number,
    },
    dealerName: {
      type: String,
      required: true,
      trim: true,
    },
    dealerEmail: {
      type: String,
      trim: true,
      unique: true,
      required : true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    dealerAmount: {
      type: Number,
      trim: true,
      required : true,
    },
    dealerBalance: {
      type: Number,
      default : 0
    },
    dealerMobile: {
      type: String,
      trim: true,
      required : true,
    },
    dealerCountry: {
      type: String,
      required : true,
      trim: true,
    },
    dealerAddress: {
      type: String,
      required : true,
      trim: true,
    },
    status: {
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

dealerSchema.pre("save", async function(next){
    let sn = 0;
    const dealer = await model('Dealer').find().sort({sn:-1}).limit(1);
    if(dealer.length === 0){
        sn = 1
    }else{
        sn = (dealer[0].sn+1)
    }
    this.sn = sn;
    next();
});

const DealerModel = model("Dealer",dealerSchema)
export default DealerModel;
