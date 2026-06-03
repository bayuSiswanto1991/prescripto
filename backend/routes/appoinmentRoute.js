const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authUser");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appoinment = require("../models/appointmentModel");

// ─────────────────────────────────────
// BOOKING APPOINTMENT
// POST /api/user/book-appointment
// → harus login user (authUser)
// ─────────────────────────────────────
router.post("/book-appointment", authUser, async (req, res, next) => {
  try {
    // ambil data booking dari request body
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;

    console.log("🔍 [BOOKING] Request data:", { docId, slotDate, slotTime, userId });

    // ambil data dokter -  tanpa password
    const docData = await Doctor.findById(docId).select("-password");

    // ✅ CEK: Dokter ada atau tidak
    if (!docData) {
      const err = new Error("Dokter tidak ditemukan");
      err.status = 400;
      console.error("❌ [BOOKING] Dokter tidak ditemukan, docId:", docId);
      throw err;
    }

    // cek apakah dokter tersedia
    if (!docData.available) {
      const err = new Error("Dokter tidak tersedia");
      err.status = 400;
      console.warn("❌ [BOOKING] Dokter tidak tersedia");
      throw err;
    }

    console.log("📦 [BOOKING] slots_booked sebelum:", docData.slots_booked);
    console.log("📦 [BOOKING] slotDate:", slotDate);
    console.log("📦 [BOOKING] slotTime:", slotTime);

    // cek apakah slot sudah dipesan
    // slots_booked = { "27_5_2026": ["10:00", "10:30"] }
    let slots_booked = docData.slots_booked || {}; // ✅ FIX: jika undefined, pakai object kosong

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        // slot sudah sudah ada → tolak booking!
        const err = new Error("Slot sudah dipesan");
        err.status = 400;
        console.warn("❌ [BOOKING] Slot sudah dipesan:", slotDate, slotTime);
        throw err;
      }
    }

    // tambahkan slot baru ke slots_booked dokter
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // buat array baru kalau tanggal belum ada
    }

    slots_booked[slotDate].push(slotTime); // tambah jam yang dipesan

    console.log("✅ [BOOKING] slots_booked sesudah:", slots_booked);

    // ambil data user - tanpa password
    const userData = await User.findById(userId).select("-password");

    // ✅ CEK: User ada atau tidak
    if (!userData) {
      const err = new Error("User tidak ditemukan");
      err.status = 400;
      console.error("❌ [BOOKING] User tidak ditemukan, userId:", userId);
      throw err;
    }

    // update slots_booked di database dokter
    // → supaya slots tidak bisa dipesan dua kali!
    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    console.log("✅ [BOOKING] Doctor slots_booked updated");

    // simpan appoinment ke database
    // userData dan docData disimpan langsung (snapshot)
    // supaya histor tetap akurat mesti data berubah nanti
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };

    console.log("📝 [BOOKING] Creating appointment with data:", {
      userId,
      docId,
      slotDate,
      slotTime,
      amount: docData.fees,
      date: appointmentData.date,
    });

    await Appoinment.create(appointmentData);
    console.log("✅ [BOOKING] Appointment berhasil dibuat");

    res.json({
      success: true,
      pesan: "Appointment berhasil dibooking",
    });
  } catch (err) {
    console.error("❌ [BOOKING] Error:", err.message);
    next(err);
  }
});

// ─────────────────────────────────────
// LIHAT APPOINTMENT MILIK USER
// GET /api/user/my-appointments
// → harus login user (authUser)
// → hanya tampilkan appointment milik user ini
// ─────────────────────────────────────
router.get("/my-appointments", authUser, async (req, res, next) => {
  try {
    // ambil userid dari token
    const userId = req.userId;

    // cari appoinment berdasarikan userId
    // hanya appoinment userId ini yang tampil!
    const appointments = await Appoinment.find({ userId });
    res.json({ success: true, appointments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
