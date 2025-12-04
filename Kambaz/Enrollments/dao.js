import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function EnrollmentsDao() {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }
  // async function findEnrollmentsForUser(userId) {
  //   const { enrollments } = db;
  //   return enrollments.filter((enrollment) => enrollment.user === userId);
  // }
  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
    // const { enrollments } = db;
    // const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    // enrollments.push(newEnrollment);
    // return newEnrollment;
  }
  function unenrollUserInCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
    // const { enrollments } = db;
    // db.enrollments = enrollments.filter(
    //   (enrollment) =>
    //     enrollment.course !== courseId || enrollment.user !== userId
    // );
  }
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }
  return {
    findCoursesForUser,
    findUsersForCourse,
    // findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserInCourse,
    unenrollAllUsersFromCourse,
  };
}
