import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path, // Cloudinary URL
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

export default router;
