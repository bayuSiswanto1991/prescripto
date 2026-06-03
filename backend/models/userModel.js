const mongoose = require("mongoose");

// Schema untuk data User (Pasien)
const userSchema = new mongoose.Schema(
  {
    // Data wajib saat register
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Data profil - opsional, bisa dilengkapi nanti
    image: { type: String, default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
    },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" }, //date of birth
    phone: { type: String, default: "000-000-0000" },
  },
  { timestamps: true }, // otomatis tambah cretedAt & updateAt
);

// buat model dari Schema
// →  Mongoose otomatis buat collection "user" di MongoDb
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
