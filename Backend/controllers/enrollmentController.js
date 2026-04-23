import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';

// @desc    Enroll user in a course
// @route   POST /api/enroll/:courseId
// @access  Private
export const enrollUser = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: course._id,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'User already enrolled' });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: course._id,
    });

    // Emit live notification
    const io = req.app.get('io');
    if (io) {
      io.emit('notification', {
        type: 'enrollment',
        message: `${req.user.name} just enrolled in ${course.title}!`,
        timestamp: new Date(),
      });
    }

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user enrollments
// @route   GET /api/enroll/my
// @access  Private
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollment status for a specific course
// @route   GET /api/enroll/status/:courseId
// @access  Private
export const getEnrollmentStatus = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    });

    res.json({
      enrolled: !!enrollment,
      progress: enrollment ? enrollment.progress : 0,
      completedLessons: enrollment ? enrollment.completedLessons : [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lesson progress
// @route   PATCH /api/enroll/progress/:courseId
// @access  Private
export const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: req.params.courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);

      // Calculate new progress percentage
      // We need to know total lessons across all modules
      const modules = await Module.find({ courseId: req.params.courseId });
      let totalLessonsCount = 0;
      modules.forEach(m => {
        totalLessonsCount += m.lessons.length;
      });

      if (totalLessonsCount > 0) {
        enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessonsCount) * 100);
      }
      
      if (enrollment.progress === 100) {
        enrollment.status = 'completed';
      }

      enrollment.lastAccessedAt = Date.now();
      await enrollment.save();
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
