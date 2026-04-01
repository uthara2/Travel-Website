import express from "express";
import Enquiries from "../models//Enquiries.js";

const router = express.Router();


// ================= Create Enquiry =================
router.post("/create-enquiry", async (req, res) => {
  try {

    const { firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const enquiry = new Enquiries({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error while submitting enquiry"
    });
  }
});


// ================= Get All Enquiries =================
router.get("/enquiries", async (req, res) => {
  try {

    const enquiries = await Enquiries.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries"
    });
  }
});

// ================= Delete Enquiry =================
router.delete("/delete-enquiry/:id", async (req, res) => {
  try {

    const enquiry = await Enquiries.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry"
    });
  }
});

export default router;