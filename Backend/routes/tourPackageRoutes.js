import express from "express";
import TourPackage from "../models/TourPackage.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* ===============================
   CREATE TOUR PACKAGE
================================= */
router.post("/create", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Package image required" });
    }

    const uploadImage = () => {
      return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "tour-packages" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);

      });
    };

    const uploadedImage = await uploadImage();

    const newPackage = new TourPackage({
      title: req.body.title,
      destination: req.body.destination,
      price: req.body.price,
      duration: req.body.duration,
      description: req.body.description,
      image: uploadedImage.secure_url,
      maxPersons: req.body.maxPersons,
      status: req.body.status || "Active",
      itinerary: req.body.itinerary ? JSON.parse(req.body.itinerary) : [],
      inclusions: req.body.inclusions ? JSON.parse(req.body.inclusions) : [],
      exclusions: req.body.exclusions ? JSON.parse(req.body.exclusions) : [],
      gallery: req.body.gallery ? JSON.parse(req.body.gallery) : []
    });

    const savedPackage = await newPackage.save();

    res.status(201).json(savedPackage);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


/* ===============================
   GET ALL PACKAGES
================================= */
router.get("/", async (req, res) => {
  try {

    const packages = await TourPackage.find();

    res.json(packages);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ===============================
   GET SINGLE PACKAGE
================================= */
router.get("/:id", async (req, res) => {
  try {

    const pkg = await TourPackage.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(pkg);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ===============================
   UPDATE PACKAGE
================================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {

    let updatedData = {
      title: req.body.title,
      destination: req.body.destination,
      price: req.body.price,
      duration: req.body.duration,
      description: req.body.description,
      maxPersons: req.body.maxPersons,
      status: req.body.status,
      itinerary: req.body.itinerary ? JSON.parse(req.body.itinerary) : [],
      inclusions: req.body.inclusions ? JSON.parse(req.body.inclusions) : [],
      exclusions: req.body.exclusions ? JSON.parse(req.body.exclusions) : [],
      gallery: req.body.gallery ? JSON.parse(req.body.gallery) : []
    };

    if (req.file) {

      const uploadImage = () => {
        return new Promise((resolve, reject) => {

          const stream = cloudinary.uploader.upload_stream(
            { folder: "tour-packages" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(req.file.buffer);

        });
      };

      const uploadedImage = await uploadImage();
      updatedData.image = uploadedImage.secure_url;
    }

    const updated = await TourPackage.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ===============================
   DELETE PACKAGE
================================= */
router.delete("/:id", async (req, res) => {
  try {

    await TourPackage.findByIdAndDelete(req.params.id);

    res.json({ message: "Package deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;