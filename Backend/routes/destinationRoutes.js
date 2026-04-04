import express from "express";
import multer from "multer";
import Destination from "../models/Destination.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* ===============================
   GET DESTINATIONS BY CATEGORY
================================= */
router.get("/category/:id", async (req, res) => {
  try {
    const destinations = await Destination.find({
      category: req.params.id,
    })
      .populate("category", "name")

    if (destinations.length === 0) {
      return res.json({
        category: null,
        destinations: [],
      });
    }

    res.json({
      category: destinations[0].category,
      destinations,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===============================
   GET DESTINATIONS BY DISTRICT
   ⚠️ MUST COME BEFORE /:id
================================= */
router.get("/district/:id", async (req, res) => {
  try {
    const destinations = await Destination.find({
      district: { $regex: new RegExp(`^${req.params.id}$`, "i") }
    })
      .populate("category", "name")

    res.json(destinations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===============================
   GET ALL DESTINATIONS
================================= */
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("category", "name")

    res.json(destinations);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   GET ONE DESTINATION
   ⚠️ KEEP THIS LAST
================================= */
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("category", "name")

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(destination);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   CREATE DESTINATION
================================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Main image required" });
    }

    const uploadMainImage = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "destinations" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const mainImage = await uploadMainImage();

    const newDestination = new Destination({
      title: req.body.title,
      place: req.body.place,
      category: req.body.category,
      district: req.body.district, // ✅ ADDED
      location: req.body.location,
      country: req.body.country,
      price: req.body.price,
      description: req.body.description,
      duration: req.body.duration,
      stay: req.body.stay,
      transport: req.body.transport,
      image: mainImage.secure_url,
      itinerary: req.body.itinerary ? JSON.parse(req.body.itinerary) : [],
      included: req.body.included ? JSON.parse(req.body.included) : [],
      notIncluded: req.body.notIncluded ? JSON.parse(req.body.notIncluded) : [],
    });

    const saved = await newDestination.save();

    const populated = await saved
      .populate("category", "name") // ✅ ADDED

    res.status(201).json(populated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   UPDATE DESTINATION
================================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {

    let updatedData = {
      title: req.body.title,
      place: req.body.place,
      category: req.body.category,
      district: req.body.district, // ✅ ADDED
      location: req.body.location,
      country: req.body.country,
      price: req.body.price,
      description: req.body.description,
      duration: req.body.duration,
      stay: req.body.stay,
      transport: req.body.transport,
      itinerary: req.body.itinerary ? JSON.parse(req.body.itinerary) : [],
      included: req.body.included ? JSON.parse(req.body.included) : [],
      notIncluded: req.body.notIncluded ? JSON.parse(req.body.notIncluded) : [],
    };

    if (req.file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "destinations" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
      };

      const result = await uploadToCloudinary();
      updatedData.image = result.secure_url;
    }

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    )
      .populate("category", "name") // ✅ ADDED

    if (!updated) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   DELETE DESTINATION
================================= */
router.delete("/:id", async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;