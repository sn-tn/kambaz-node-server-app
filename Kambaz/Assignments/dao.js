import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
    // const { assignments } = db;
    // return assignments.filter((assignment) => assignment.course === courseId);
  }
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, id: uuidv4() };
    // db.assignments = [...db.assignments, newAssignment];
    // return newAssignment;
    return model.create(newAssignment);
  }
  function deleteAssignment(assignmentId) {
    // const { assignments } = db;
    // db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    return model.deleteOne({ _id: assignmentId });
  }
  function updateAssignment(assignmentId, assignmentUpdates) {
    // const { assignments } = db;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  }
  function findAssignmentById(assignmentId) {
    // const { assignments } = db;
    // return assignments.find((a) => a._id === assignmentId);
    return model.findById({ _id: assignmentId });
  }
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}
