import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: {type: String, ref: "courses"},
  description: String,
  points: Number,
  due: Date,
  availableFrom: Date,
  availableUntil: Date
},
{
  collection: "assignments"
});
export default assignmentsSchema;