const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");

// ─────────────────────────────────────
// LIHAT SEMUA DOKTER — PUBLIC
// GET /api/doctor/list
// → tidak perlu login
// → siapapun bisa lihat list dokter
// ─────────────────────────────────────
router.get("/list", async (req, res, next) => {
  try {
    // ambil semua dokter dari database
    // → password dan email tidak ditampilan ke public
    // → keamanan dokter terjaga
    const doctors = await Doctor.find({}).select("-password -email");
    res.json({ success: true, doctors });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
