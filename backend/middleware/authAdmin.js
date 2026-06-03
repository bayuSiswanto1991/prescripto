const jwt = require("jsonwebtoken");

// ─────────────────────────────────────
// MIDDLEWARE — Verifikasi Token Admin
// → dipasang di route khusus admin
// → bedanya dengan authUser:
//   authUser  → cek userId di token
//   authAdmin → cek email === ADMIN_EMAIL
// ─────────────────────────────────────
const authAdmin = (req, res, next) => {
  try {
    // ambil Authorization headers dari request
    // format: "Bearer eyJhbGci..."
    const authHeader = req.headers.authorization;

    // kalau tidak ada header → belum login admin!
    if (!authHeader) {
      const err = new Error("Akses ditolak - Login dulu!");
      err.status = 401;
      return next(err);
    }

    // ambil token dari header
    // "Bearer eyJhbGci..." → split → ambil index [1]
    const atoken = authHeader.split(" ")[1];

    // verifikasi token dengan JWT_SECRET
    // → decode = { email: "admin@prescripto.com", ... }
    const decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // cek apakah email di token sama dengan ADMIN_EMAIL di .env
    // → kalau beda → bukan admin!
    // ini yang membekan token admin dengan token user biasa
    if (decode.email !== process.env.ADMIN_EMAIL) {
      const err = new Error("Bukan admin!");
      err.status = 401;
      return next(err);
    }

    // token valid + email cocok → lanjut ke route handler
    next();
  } catch (err) {
    err.status = 401;
    err.message = "Token tidak valid!";
    next(err);
  }
};

module.exports = authAdmin;
