import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async ( req, res ) => {
    try {
        const { name, mobile, email, password } = req.body;

        const normalizedEmail = email.toLowerCase().trim();

        //check if user exist
        const existingUser = await User.findOne({ email: normalizedEmail });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            name,
            mobile,
            email: normalizedEmail,
            password: hashedPassword,
        });
        
        const { password: _, ...userData } = user._doc;
        res.status(201).json({ message: "User registered successfully", user: userData })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//LOGIN
export const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const normalizedEmail = email.toLowerCase().trim();

        //check user
        const user = await User.findOne({ email: normalizedEmail });
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //generate token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const { password: _, ...userData } = user._doc;

        res.status(200).json({ message: "Successfully logged In", token, user: userData })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//GOOGLE
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("👉 Token received:", token);

    // 1. Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("✅ Token verified");

    const payload = ticket.getPayload();

    const email = payload.email.toLowerCase().trim();
    const name = payload.name;

    console.log("👉 Google payload:", payload);

    // 2. Check if user exists
    let user = await User.findOne({ email });

    console.log("👉 Email:", email);

    // 3. If NOT → create user
    if (!user) {
      console.log("👉 Creating new Google user...");

      const randomPassword = Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      try {
        user = await User.create({
          name,
          email,
          password: hashedPassword,
          provider: "google", // 🔥 ADD THIS
        });

        console.log("✅ User CREATED:", user);
      } catch (err) {
        console.log("❌ CREATE ERROR:", err);

        return res.status(500).json({
          message: "User creation failed",
          error: err.message,
        });
      }
    } else {
      console.log("✅ Existing user found:", user.email);
    }

    // 4. Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, ...userData } = user._doc;

    // 5. Send response
    res.status(200).json({
      token: jwtToken,
      user: userData,
    });

  } catch (error) {
    console.log("🔥 GOOGLE ERROR FULL:", error);
    res.status(500).json({ message: error.message });
  }
};