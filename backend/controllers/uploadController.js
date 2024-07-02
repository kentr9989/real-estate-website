const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadController = require('express').Router();

// Ensure the directory exists
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'public', 'images');
    ensureDirExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  },
});

uploadController.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json('No file uploaded');
    }
    res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json('An error occurred while uploading the file');
  }
});

module.exports = uploadController;
