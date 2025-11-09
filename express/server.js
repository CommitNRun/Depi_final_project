import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🧠 MongoDB connection
mongoose.connect("mongodb://admin:secret@mongo:27017/", {
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// 🧱 User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  dateOfBirth: String,
  gender: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// 🧩 Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, gender, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const user = new User({ firstName, lastName, email, phone, dateOfBirth, gender, password });
    await user.save();

    res.json({ message: "User created successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// 🆕 ✨ LOGIN ROUTE (newly added)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // For now, just compare plain passwords (you can hash later)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // If correct
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// 🚀 Start server
app.listen(5000, () => console.log("🚀 Backend running on port 5000"));
