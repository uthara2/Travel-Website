import express from "express";
import multer from "multer";

import cloudinary from "../config/cloudinary.js";
import Category from "../models/Category.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/* ----------------------------------------------------
   Helper: Upload Image to Cloudinary
---------------------------------------------------- */
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

/* ----------------------------------------------------
   CREATE Category
---------------------------------------------------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const category = new Category({
      name,
      image: uploadResult.secure_url,
    });

    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
});

/* ----------------------------------------------------
   GET All Categories
---------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Fetch Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
});

/* ----------------------------------------------------
   GET Single Category
---------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Fetch Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching category",
    });
  }
});

/* ----------------------------------------------------
   UPDATE Category
---------------------------------------------------- */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;

    const updateData = { name };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      updateData.image = uploadResult.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
});

/* ----------------------------------------------------
   DELETE Category
---------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
});

export default router;