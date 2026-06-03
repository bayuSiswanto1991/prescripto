const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/authUser");
const upload = require("../middleware/multer");
const Appoinement = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");

// ─────────────────────────────────────
// REGISTER — daftar akun baru
// POST /api/user/register
// ─────────────────────────────────────

router.post("/register", async (req, res, next) => {
  try {
    // ambil data dari request body
    const { name, email, password } = req.body;

    // cek email sudah terdaftar belum
    // → email harus unik tidak boleh sama
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("Email sudah terdaftar");
      err.status = 401;
      throw err;
    }

    // hash password sebelum disimpan
    // → password asli tidak pernah disimpan didatabase
    const hased = await bcrypt.hash(password, 10);

    // simpan user baru ke database
    const user = await User.create({
      name,
      email,
      password: hased,
    });

    // kirim response - tanpa pasword
    res.status(201).json({
      pesan: "Register berhasil!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────
// LOGIN — masuk ke akun
// POST /api/user/login
// ─────────────────────────────────────

router.post("/login", async (req, res, next) => {
  try {
    // ambil email + password dari request body
    const { email, password } = req.body;

    // cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Email tidak ada!");
      err.status = 401;
      throw err;
    }

    // bandingkan password  dengan hash di database
    // bcrypt.compare → return true/false
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Password salah!");
      err.status = 401;
      throw err;
    }

    // buat jwt token
    // → berisi userId → dipakai untuk identifikasi user
    // expired 7 hari
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // kirim toket → data user ke client
    // → clien simpan toket di localStorege
    // → token dipakai untuk akses protected route
    res.json({
      pesan: "Login berhasil!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET profile user
// GET /api/user/profile
router.get("/profile", authUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// UPDATE profile user
// POST /api/user/update-profile
router.post("/update-profile", authUser, upload.single("image"), async (req, res, next) => {
  try {
    const { name, dob, gender, phone, address } = req.body;
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    const updateData = { name, dob, gender, phone, address: parsedAddress };

    // kalau ada foto baru update image
    if (req.file) {
      updateData.image = req.file.path;
    }

    await User.findByIdAndUpdate(req.userId, updateData);

    res.json({ success: true, pesan: "Profile berhasil diUpdate" });
  } catch (err) {
    next(err);
  }
});

router.post("/cancel-appointment/:appointmentId", authUser, async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appoinement.findById(appointmentId);

    if (appointment.userId !== req.userId) {
      const err = new Error("Bukan Appoinement kamu");
      err.status = 401;
      throw err;
    }

    await Appoinement.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointment;
    const doctor = await Doctor.findById(docId);
    let slots_booked = doctor.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
