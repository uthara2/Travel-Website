import mongoose from "mongoose";

const tourPackageSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    gallery: [
        {
            type: String
        }
    ],

    inclusions: [
        {
            type: String
        }
    ],

    exclusions: [
        {
            type: String
        }
    ],

    itinerary: [
        {
            day: String,
            title: String,
            description: String
        }
    ],

    maxPersons: {
        type: Number
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
},
{
    timestamps: true
}
);

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);

export default TourPackage;