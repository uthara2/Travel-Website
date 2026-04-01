import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import multer from "multer";

import destinationRoutes from "./routes/destinationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import taxiRoutes from "./routes/taxiRoutes.js";
import tourPackageRoutes from "./routes/tourPackageRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enquiriesRoutes from "./routes/enquiriesRoutes.js"

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: "*"
}));

/* ================= MongoDB ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


/* ================= Cloudinary ================= */

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/* ================= Multer ================= */

const storage = multer.memoryStorage();
const upload = multer({ storage });


/* ================= Routes ================= */

app.use("/api/destinations", destinationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/taxi", taxiRoutes);
app.use("/api/packages", tourPackageRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiriesRoutes);



/* ================= Helper ================= */

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "destinations" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};


/* ================= Server ================= */

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);