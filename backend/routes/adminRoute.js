const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authAdmin = require("../middleware/authAdmin");
const upload = require("../middleware/multer");
const Doctor = require("../models/doctorModel");
const Appointments = require("../models/appointmentModel");

// ─────────────────────────────────────
// LOGIN ADMIN
// POST /api/admin/login
// → tidak pakai database — cek dari .env
// ─────────────────────────────────────

router.post("/login", async (req, res, next) => {
  try {
    // cek email + password dengan data di .env
    //  → admin tidak bisa daftar sendiri
    //  → hanya developer yang tahu email + password admin
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      const err = new Error("Email & Password salah!");
      err.status = 401;
      throw err;
    }

    // buat token admin
    //  → berisi email  → dipakai untuk verivikasi di authAdmin middleware
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────
// TAMBAH DOKTER BARU
// POST /api/admin/add-doctor
// → harus login admin (authAdmin)
// → bisa upload foto (multer)
// ─────────────────────────────────────
router.post("/add-doctor", authAdmin, upload.single("image"), async (req, res, next) => {
  try {
    // ambil semua data dokter dari form
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

    // parse adress kalau dikirim sebagai string JSON
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    // ambil path foto - kalau tidak ada foto → pakai default
    const image = req.file ? req.file.path : "default.jpg";

    // hash password dokter sebelum disimpan
    const hased = await bcrypt.hash(password, 10);

    // simpan dokter baru ke database
    const doctor = await Doctor.create({
      name,
      email,
      password: hased,
      image,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
    });

    res.status(201).json({
      success: true,
      pesan: "Dokter berhasil ditambahkan ",
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────
// LIHAT SEMUA DOKTER
// GET /api/admin/all-doctor
// → harus login admin (authAdmin)
// ─────────────────────────────────────
router.get("/all-doctor", authAdmin, async (req, res, next) => {
  try {
    // ambil semua dokter - password tidak ditampilkan
    const doctors = await Doctor.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────
// LIHAT SEMUA APPOINTMENT
// GET /api/admin/appointments
// → harus login admin (authAdmin)
// ─────────────────────────────────────
router.get("/appointments", authAdmin, async (req, res, next) => {
  try {
    // ambil semua appointment dari semua user
    // hanya admin yang boleh lihat semua!
    const appointments = await Appointments.find({});
    res.json({ success: true, appointments });
  } catch (err) {
    next(err);
  }
});

// TOGGLE AVAILABLE DOKTER
// POST /api/admin/toggle-available/:docId
// → harus login admin (authAdmin)

router.post("/toggle-available/:docId", authAdmin, async (req, res, next) => {
  try {
    const { docId } = req.params;

    // cari dokter berdasarkan id

    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      const err = new Error("Dokter tidak ditemukan");
      err.status = 404;
      throw err;
    } else {
      //toggle available → true jadi false dan false jadi true
      await Doctor.findByIdAndUpdate(docId, {
        available: !doctor.available,
      });
      res.json({ success: true, pesan: "Status dokter berhasil diubah" });
    }
  } catch (err) {
    next(err);
  }
});

// CANCEL APPOINTMENT
// POST /api/admin/cancel-appointment/:appointmentId
// → harus login admin (authAdmin)
router.post("/cancel-appointment/:appointmentId", authAdmin, async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    // cari appoinment berdasarikan id
    const appointment = await Appointments.findById(appointmentId);

    if (!appointment) {
      const err = new Error("Appoinment tidak ditemukan");
      err.status = 404;
      throw err;
    }

    // update cancelled jadi true
    await Appointments.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // kembali ke slot dokter
    const { docId, slotDate, slotTime } = appointment;
    const doctor = await Doctor.findById(docId);
    let slots_booked = doctor.slots_booked;

    // hapus slot yang dibatalkan
    slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, pesan: "Appointment berhasil dibatalkan " });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/dashboard
// → statistik untuk dashboard

router.get("/dashboard", authAdmin, async (req, res, next) => {
  try {
    // hitung total
    const doctors = await Doctor.countDocuments();
    const appointments = await Appointments.countDocuments();

    // ambil semua userId yang unik → total paisen
    const allAppointments = await Appointments.find({});
    const uniquePatients = new Set(allAppointments.map((a) => a.userId));

    // 5 appoinments terbaru
    const latestAppointments = await Appointments.find({})
      .sort({ date: -1 }) // ← sort terbaru dulu
      .limit(5);

    res.json({
      success: true,
      dashData: {
        doctors,
        appointments,
        patients: uniquePatients.size,
        latestAppointments,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────
// RESET SEMUA DOKTER JADI AVAILABLE
// POST /api/admin/reset-doctors-available
// → harus login admin (authAdmin)
// → untuk testing: set semua dokter available=true & clear slots_booked
// ─────────────────────────────────────
router.post("/reset-doctors-available", authAdmin, async (req, res, next) => {
  try {
    // update semua dokter:
    // available = true
    // slots_booked = {}
    const result = await Doctor.updateMany(
      {},
      {
        available: true,
        slots_booked: {},
      }
    );

    console.log(`✅ [ADMIN] ${result.modifiedCount} dokter berhasil di-reset (available=true, slots_booked={})`);

    res.json({
      success: true,
      pesan: `${result.modifiedCount} dokter berhasil di-reset menjadi available=true`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
