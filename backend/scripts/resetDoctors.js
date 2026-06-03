// Script untuk reset semua dokter menjadi available=true dan clear slots_booked
// Usage: node scripts/resetDoctors.js

require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("../models/doctorModel");

const resetDoctors = async () => {
  try {
    // Connect ke MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Reset semua dokter
    console.log("🔄 Resetting all doctors...");
    const result = await Doctor.updateMany(
      {},
      {
        available: true,
        slots_booked: {},
      },
    );

    console.log(`✅ Success! ${result.modifiedCount} doctors reset:`);
    console.log("   - available: true");
    console.log("   - slots_booked: {}");

    // Show all doctors
    console.log("\n📋 All doctors:");
    const doctors = await Doctor.find({}).select("name email speciality available");
    doctors.forEach((doc, idx) => {
      console.log(`   ${idx + 1}. ${doc.name} (${doc.speciality}) - Available: ${doc.available ? "✅" : "❌"}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log("\n✅ Done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

resetDoctors();
