const mongoose = require("mongoose");

// Schema untuk data dokter
const doctorSchema = new mongoose.Schema(
  {
    // Data akun, wajib saat tambah dokter
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Data profile dokter
    image: { type: String, default: "https://res.cloudinary.com/demo/image/upload/v1/profile_pic" },
    speciality: { type: String, required: true }, // contoh: General physician, Neurologist
    degree: { type: String, required: true }, // contoh: MBBS
    experience: { type: String, required: true }, // contoh: 4 Years
    about: { type: String, required: true }, //deskripsi dokter
    fees: { type: Number, required: true }, // biaya konsultasi
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
    },
    available: { type: Boolean, default: true }, // true: dokter tersedia untuk dibooking

    // Slot yang sudah dipesan
    // contoh: {"27_5_2026": ["10:00", "10:30"] }
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true }, //otomatis tambah creatdAt & updateAt
);

// buat model dari Schema
// monggose otomatis buat collection "doctor" di MonogDB
const doctorModel = mongoose.model("doctor", doctorSchema);

module.exports = doctorModel;
