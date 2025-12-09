import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  _id: String,
  title: String,
  questionType: {
    type: String,
    enum: ["MC", "TF", "FITB"],
    default: "MC",
  },
  points: Number,
  description: String,
  choices: [String],
  answers: [String],
});
export default questionsSchema;
