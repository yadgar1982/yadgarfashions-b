import {Schema,model} from "mongoose";

const categorySchema = new Schema({
    categoryName : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    image : {
        type : String,
        trim : true
    }
},{timestamps:true});

const CategoryModel = model("Category",categorySchema);
export default CategoryModel