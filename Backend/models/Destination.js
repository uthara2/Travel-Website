import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  }
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  place: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  image: {
    type: String, // Cloudinary main image
    required: true,
  },

  gallery: [
    {
      type: String, // multiple image URLs
    }
  ],

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
  },

  duration: {
    type: String, // Example: "2 Nights / 3 Days"
  },

  stay: {
    type: String, // Example: "4-star hotel"
  },

  transport: {
    type: String, // Example: "Private cab"
  },

  meals: {
    type: String, // Example: "Breakfast + Dinner"
  },

  itinerary: [itinerarySchema],

  included: [
    {
      type: String,
    }
  ],

  notIncluded: [
    {
      type: String,
    }
  ]

}, { timestamps: true });

export default mongoose.model("Destination", destinationSchema);