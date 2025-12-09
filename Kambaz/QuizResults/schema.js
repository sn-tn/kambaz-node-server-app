import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    user: { type: String, ref: "UserModel" },
    score: Number,
  },
  { collection: "quiz_results" }
);
export default quizResultSchema;
