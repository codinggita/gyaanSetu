import mongoose from 'mongoose';

const enrollmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    completedLessons: [
      {
        type: String, // Storing lesson IDs/slugs as strings for flexibility
      },
    ],
    progress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['enrolled', 'completed'],
      default: 'enrolled',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only enroll in a course once
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
