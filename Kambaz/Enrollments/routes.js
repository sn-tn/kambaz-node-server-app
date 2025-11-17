import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  }
  const enrollUserInCourse = (req, res) => {
    let { courseId, userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }

      userId = currentUser._id;
    }
    const newEnrollment = dao.enrollUserInCourse(userId, courseId);
    res.send(newEnrollment);
  }
  const unenrollUserInCourse = (req, res) => {
    let { courseId, userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = dao.unenrollUserInCourse(userId, courseId);
    res.send(status);
  }
  app.post("/api/courses/:courseId/enrollments/:userId", enrollUserInCourse);
  app.get("/api/enrollments/:userId", findEnrollmentsForUser);
  app.delete("/api/courses/:courseId/enrollments/:userId", unenrollUserInCourse);
}