import express from "express";
import TaxiBooking from "../models/TaxiBooking.js";
import Notification from "../models/Notification.js";

const router = express.Router();


// ================= Create Taxi Booking =================
router.post("/book-taxi", async (req, res) => {
  try {

    const { userId, name, phone, pickup, drop, date, time, passengers, carType, message } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!name || !phone || !pickup || !drop || !date || !time || !passengers || !carType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const booking = new TaxiBooking({
      userId,
      name,
      phone,
      pickup,
      drop,
      date,
      time,
      passengers,
      carType,
      message
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Taxi booking created successfully",
      data: booking
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error while booking taxi"
    });
  }
});


// ================= Get All Taxi Bookings =================
router.get("/taxi-bookings", async (req, res) => {
  try {

    const bookings = await TaxiBooking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
});


// ================= Get Single Booking =================
router.get("/taxi-booking/:id", async (req, res) => {
  try {

    const booking = await TaxiBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching booking"
    });
  }
});


// ================= Update Booking Status =================
router.put("/update-status/:id", async (req, res) => {
  try {

    const { status } = req.body;

    const booking = await TaxiBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    //update status
    booking.status = status;
    await booking.save();

    //create notification
    let message = "";

    if (status.toLowerCase() === "confirmed") {
      message = "🎉 Your taxi booking has been confirmed!";
    } else if (status.toLowerCase() === "rejected") {
      message = "❌ Your taxi booking was rejected.";
    }

    await Notification.create({
      userId: booking.userId,
      message,
      type: status
    })

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({
      success: false,
      message: "Status update failed"
    });
  }
});

// ================= Add API to Fetch Notifications =================

router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// DELETE single notification
router.delete("/notifications/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting notification" });
  }
});


// ================= Delete Booking =================
router.delete("/delete-booking/:id", async (req, res) => {
  try {

    const booking = await TaxiBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to delete booking"
    });
  }
});

export default router;