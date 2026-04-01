import mongoose from "mongoose";

const taxiBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    pickup: {
        type: String,
        required: true
    },

    drop: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    carType: {
        type: String,
        required: true
    },

    message: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    },
    userId: {
    type: String,
    required: true
    }
}, { timestamps: true });

export default mongoose.model("TaxiBooking", taxiBookingSchema)