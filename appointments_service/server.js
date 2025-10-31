const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURL = process.env.MONGO_URL || "mongodb://admin:secret@mongo:27017/";
mongoose
  .connect(mongoURL, { dbName: "healthcare" })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  userId: String,
  type: Number,
  date: String,
  time: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// ✅ POST: Create new appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json({ success: true, message: "Appointment saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET: Fetch all appointments (optional)
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch appointments" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Appointments service running on port ${PORT}`));
