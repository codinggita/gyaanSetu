import express from 'express';
import { courses, labs, projects, courseModules } from '../data/mock.js';

const router = express.Router();

router.get('/courses', (req, res) => res.json(courses));
router.get('/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === req.params.id || c.slug === req.params.id);
    res.json(course || {});
});
router.get('/courses/:id/modules', (req, res) => res.json(courseModules));
router.get('/labs', (req, res) => res.json(labs));
router.get('/projects', (req, res) => res.json(projects));

export default router;
