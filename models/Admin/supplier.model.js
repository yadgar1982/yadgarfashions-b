import {Schema,model} from "mongoose";

const supplierSchema = new Schema(
  {
    sn: {
      type: Number,
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    supplierEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required : true,
      match: /^\S+@\S+\.\S+$/,
    },
    supplierMobile: {
      type: String,
      trim: true,
      required : true,
    },
    supplierCountry: {
      type: String,
      required : true,
      trim: true,
    },
    supplierAddress: {
      type: String,
      required : true,
      trim: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
  },
  { timestamps: true }
);

supplierSchema.pre("save", async function(next){
    let sn = 0;
    const supplier = await model('Supplier').find().sort({sn:-1}).limit(1);
    if(supplier.length === 0){
        sn = 1
    }else{
        sn = (supplier[0].sn+1)
    }
    this.sn = sn;
    next();
});

const SupplierModel = model("Supplier",supplierSchema)
export default SupplierModel;
