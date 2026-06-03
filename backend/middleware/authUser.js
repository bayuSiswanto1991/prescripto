const jwt = require("jsonwebtoken");

// ─────────────────────────────────────
// MIDDLEWARE — Verifikasi Token User
// → dipasang di route yang butuh login
// → kalau token valid → lanjut ke route handler
// → kalau tidak ada token / invalid → 401
// ─────────────────────────────────────
const authUser = (req, res, next) => {
  try {
    // ambil Authorization header dari request
    //  // format: "Bearer eyJhbGci..."
    const authHeader = req.headers.authorization;

    // kalau tidak ada header → belum login!
    if (!authHeader) {
      const err = new Error("Login dulu!");
      err.status = 401;
      return next(err);
    }

    // ambil token dari header
    // "Bearer eyJhbGci..." → split → ["Bearer", "eyJhbGci..."]
    // ambil index [1] → token saja
    const token = authHeader.split(" ")[1];

    // verivikasi token dengan JWT_SECRET
    // → kalau valid → return decode data
    // → kalau expired/palsu → throw error → masuk catch
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // simpan userId ke req
    // → bisa dipakai di route handler berikutnya
    // → contoh : req.userId → tahu booking dari user siapa
    req.userId = decode.userId;

    // token valid → lanjut ke route handler
    next();
  } catch (err) {
    // token tidak valid atau expires
    err.status = 401;
    err.message = "Token tidak valid!";
    next(err);
  }
};

module.exports = authUser;
