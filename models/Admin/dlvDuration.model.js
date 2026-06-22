import { Schema, model } from "mongoose";

const dlvDurationSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    normalDurationValue: {
        type: Number,
        required: true
    },
     normalDurationCost: {
        type: Number,
        required: true
    },
     saleTax: {
        type: Number,
        required: true
    },
     otherTax: {
        type: Number,
        required: true
    },
       durationUnit: {
        type: String,
        enum: ['days', 'weeks', 'months'],
        required: true
    },
    flag: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const DlvDurationModel = model("DlvDuration", dlvDurationSchema);

export default DlvDurationModel;