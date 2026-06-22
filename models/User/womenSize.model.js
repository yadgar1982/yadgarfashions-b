import {Schema,model} from "mongoose";

const womenSizeSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false    
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required:false
    },
    neckBackSize: {
      type: String,
      required:false,
      trim: true
    },
    neckFrontSize: {
      type: String,
      required:false,
      trim: true
    },
    sleeveLengthSize: {
      type: String,
      required:false,
      trim: true
    },
    armSize: {
      type: String,
      required:false,
      trim: true
    },
    armHoleSize: {
      type: String,
      required:false,
      trim: true
    },
    waistSize: {
      type: String,
      required:false,
      trim: true
    },
    hipsSize: {
      type: String,
      required:false,
      trim: true
    },
    thighsSize: {
      type: String,
      required:false,
      trim: true
    },
    calfSize: {
      type: String,
      required:false,
      trim: true
    },
    soulderWidthSize : {
      type: String,
      required:false,
      trim: true
    },
    bustSize : {
      type: String,
      required:false,
      trim: true
    },
    sleaveSize : {
      type: String,
      required:false,
      trim: true
    },
    shirtLengthSize : {
      type: String,
      required:false,
      trim: true
    },
    pantsLengthSize : {
      type: String,
      required:false,
      trim: true
    },
     otherDetails: {
      type: String,
      required: false,
      trim: true
    }
},{timestamps:true});

const WomenSizeModel = model("Womensize",womenSizeSchema);

export default WomenSizeModel;