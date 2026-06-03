require("dotenv").config(); // ← load .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ─────────────────────────────────────
// IMPORT ROUTES
// ─────────────────────────────────────
const authRoute = require("./routes/authRoute"); // register +  login user
const doctorRoute = require("./routes/doctorRoute"); // list doctor (public)
const adminRoute = require("./routes/adminRoute"); // kelola dokter + appointment
const appointmentRoute = require("./routes/appoinmentRoute"); // booking + my-appointment

const app = express();
const port = process.env.PORT || 4000; // pakai port dari .env atau defaul 4000

// ─────────────────────────────────────
// MIDDLEWARE GLOBAL
// → jalan di semua request
// ─────────────────────────────────────
app.use(cors()); // izinkan request dari semua origin (React di port 5173)
app.use(express.json()); // parse request body jadi object javascript
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─────────────────────────────────────
// ROUTES
// → setiap resource punya prefix sendiri
// ─────────────────────────────────────
app.use("/api/user", authRoute); // POST /api/user/register, /api/user/login
app.use("/api/user/", appointmentRoute); // POST /api/user/book-appointment, GET /api/user/my-appointments
app.use("/api/doctor", doctorRoute); // GET  /api/doctor/list
app.use("/api/admin", adminRoute); // POST /api/admin/login, /api/admin/add-doctor

// ─────────────────────────────────────
// ERROR HANDLER GLOBAL
// → tangkap semua error dari route handler
// → harus paling terakhir!
// ─────────────────────────────────────
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, message: err.message || "Server error" });
});

// ─────────────────────────────────────
// START SERVER
// → connect MongoDB dulu baru jalankan server
// → kalau gagal connect → stop server
// ─────────────────────────────────────
const startServer = async () => {
  try {
    // connect ke MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connect to MongoDB");

    // jalankan server setelah database siap
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    // gagal connect → stop server
    console.log("❌ Failed", err.message);
    process.exit(1);
  }
};

startServer();
