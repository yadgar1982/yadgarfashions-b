import {Schema,model} from "mongoose";

const brandSchema = new Schema({
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    brandName: {
      type: String,
      required: true,
      trim: true
    },
    image : {
        type : String,
        trim : true
    }
},{timestamps:true});

const BrandModel = model("Brand",brandSchema);

export default BrandModel;