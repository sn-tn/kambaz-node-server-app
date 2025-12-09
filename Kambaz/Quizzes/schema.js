import mongoose from "mongoose";
import questionsSchema from "../Questions/schema.js";

const quizzesSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: { type: String, ref: "courses" },
    quizType: {
      type: String,
      enum: ["GRADED", "PRACTICE", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED",
    },
    points: Number,
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffle: {
      type: Boolean,
      default: true,
    },
    timeLimit: {
      type: Number,
      default: 20,
    },
    multipleAttempts: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 1,
    },
    showCorrect: {
      type: String,
      enum: ["NEVER", "IMMEDIATELY"],
      default: "IMMEDIATELY",
    },
    accessCode: {
      type: String,
      default: "",
    },
    oneQuestionAtATime: {
      type: Boolean,
      default: true,
    },
    webcamRequired: {
      type: Boolean,
      default: false,
    },
    lockQuestions: {
      type: Boolean,
      default: false,
    },
    due: Date,
    availableFrom: Date,
    availableUntil: Date,
    published: {
      type: Boolean,
      default: false,
    },
    questions: [questionsSchema],
  },
  { collection: "quizzes" }
);
export default quizzesSchema;
