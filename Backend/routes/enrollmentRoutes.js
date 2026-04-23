import express from 'express';
import {
  enrollUser,
  getMyEnrollments,
  getEnrollmentStatus,
  updateProgress,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All enrollment routes are protected

router.post('/:courseId', enrollUser);
router.get('/my', getMyEnrollments);
router.get('/status/:courseId', getEnrollmentStatus);
router.patch('/progress/:courseId', updateProgress);

export default router;
