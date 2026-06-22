import {Schema,model} from "mongoose";

const currencySchema = new Schema({
    currency: {
      type: String,
      required: true,
      trim : true
    },
    flag: {
      type: String,
      trim: true
    },
    countryName: {
      type: String,
      trim: true,
      lowercase : true
    },
    currencyCode: {
      type: String,
      trim: true
    },
},{timestamps:true});

const CurrencyModel = model("Currency",currencySchema);

export default CurrencyModel;