import {Schema,model} from "mongoose"

const brandingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  mobile: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    trim: true,
  },
  logo: {
    type: String, // URL or filename
  },
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },
  linkedIn: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
  },
  privacy: {
    type: String,
  },
  cookie: {
    type: String,
  },
  terms: {
    type: String,
  }
},{timestamps:true});

const BrandingModel = model("Branding",brandingSchema);
export default BrandingModel;
