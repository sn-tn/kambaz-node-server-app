import mongoose from "mongoose";
import quizzesSchema from "./schema.js";

const model = mongoose.model("QuizModel", quizzesSchema);
export default model;