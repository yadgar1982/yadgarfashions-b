import {Schema,model} from "mongoose";

const addsSchema = new Schema({
    addsName: {
      type: String,
    },
    image : {
        type : String,
        trim : true
    }
},{timestamps:true});

const AddsModel = model("Avertising",addsSchema);

export default AddsModel;