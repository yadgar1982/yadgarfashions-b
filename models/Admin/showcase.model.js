import {Schema,model} from "mongoose";

const showcaseSchema = new Schema({
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    image : {
        type : String,
        trim : true
    }
},{timestamps:true});

const ShowcaseModel = model("Showcase",showcaseSchema);
export default ShowcaseModel;