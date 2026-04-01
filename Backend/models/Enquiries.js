import mongoose from "mongoose";

const enquiriesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    message: {
        type: String
    },

}, { timestamps: true });

export default mongoose.model("Enquiries", enquiriesSchema)