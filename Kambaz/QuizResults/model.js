import mongoose from "mongoose";
import quizResultSchema from "./schema.js";

const model = mongoose.model("QuizResultModel", quizResultSchema);
export default model;