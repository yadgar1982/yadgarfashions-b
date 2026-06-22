import {Schema,model} from "mongoose";

const taxSchema = new Schema({
    taxName: {
      type: String,
      required: true,
      trim : true
    },
    taxAmount: {
      type: Number,
      trim: true
    },
   
},{timestamps:true});

const TaxModel = model("tax",taxSchema);

export default TaxModel;