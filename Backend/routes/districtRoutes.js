// routes/districtRoutes.js

import express from "express";
import District from "../models/District.js";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET DISTRICTS */

router.get("/", async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ADD DISTRICT */

router.post("/", upload.single("image"), async (req, res) => {
  try {

    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "districts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const district = new District({
      name: req.body.name,
      image: imageUrl
    });

    await district.save();

    res.status(201).json(district);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {

    await District.findByIdAndDelete(req.params.id);

    res.json({ message: "District deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;