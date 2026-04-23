import express from 'express';
import { courses } from '../data/mock.js';

const router = express.Router();

// Mock me/courses for now, filtering out courses with progress > 0
router.get('/courses', (req, res) => {
    const myCourses = courses.filter((c) => (c.progress ?? 0) > 0);
    res.json(myCourses);
});

export default router;
