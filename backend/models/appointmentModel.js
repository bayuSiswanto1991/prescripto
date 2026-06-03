const mongoose = require("mongoose");

// Schema untuk data Appointment (Booking)
const appointmentSceha = new mongoose.Schema(
  {
    // Rekasi - siapa yang booking dan dokter siapa
    userId: { type: String, required: true }, // id user yang booking
    docId: { type: String, required: true }, // id dokter yang dipesan

    // Waktu booking
    slotDate: { type: String, required: true }, // format: "27_5-2026"
    slotTime: { type: String, required: true }, // format: "10:00 AM"

    // Spapshot data - disimpan langsung supaya
    // kalay data user/dokter berubah, history tetap akurat
    userData: { type: Object, required: true }, // data user saat booking
    docData: { type: Object, required: true }, // data dokter saat booking

    // Pembayaran
    amount: { type: Number, required: true }, // biaya konsultasi
    date: { type: Number, required: true }, // timstamp booking dibuat (Date.now())

    // Status appointment
    cancelled: { type: Boolean, default: false }, // true: dibatalkan
    payment: { type: Boolean, default: false }, // true: sudah bayar
    isCompleted: { type: Boolean, default: false }, // true: sudah selesai
  },
  { timestamps: true }, // otomatis tambah createdAt & updatedAt
);

// buat model dari Schema
// → Mongoose otomatis buat collection "appoinment" di MongoDB
const appointmentModel = mongoose.model("appointment", appointmentSceha);

module.exports = appointmentModel;
