const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },

  filename: (req, file, callback) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    callback(null, uniqueName);
  },
});

const fileFilter = (req, file, callback) => {
  const allowdTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowdTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Hanya file gambar yang diizinkan!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
