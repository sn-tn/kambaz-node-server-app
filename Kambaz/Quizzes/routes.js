import req from "express/lib/request.js";
import QuizResultsDao from "../QuizResults/dao.js";
import QuizzesDao from "./dao.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();
  const resultsDao = QuizResultsDao();
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };
  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };
  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  };
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const newQuiz = {
      _id: uuidv4(),
      title: "New Quiz",
      description: "New Description",
      course: courseId,
      points: 0,
      due: new Date(),
      availableFrom: new Date(),
      availableUntil: new Date(),
      questions: [],
    };
    const quiz = await dao.createQuiz(newQuiz);
    res.json(quiz);
  };
  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    await resultsDao.deleteAllQuizResultsForQuiz(quizId);
    const status = await dao.deleteQuiz(quizId);
    res.send(status);
  };

  const findQuizResultsForUser = async (req, res) => {
    const { userId } = req.params;
    const results = await resultsDao.findQuizResults(userId);
    res.json(results);
  };
  const findNumberAttempts = async (req, res) => {
    const { quizId, userId } = req.params;
    const count = await resultsDao.findNumberAttempts(quizId, userId);
    res.json(count);
  };
  const createAttempt = async (req, res) => {
    const { quizId, userId } = req.params;
    const { score } = req.body;
    const newAttempt = {
      _id: uuidv4(),
      quiz: quizId,
      user: userId,
      score: score
    };
    const attempt = resultsDao.createAttempt(newAttempt);
    res.json(attempt);
  }
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:courseId/quizzes/user/:userId", findQuizResultsForUser);
  app.get("/api/courses/:courseId/quizzes/:quizId", findQuizById);
  app.put("/api/courses/:courseId/quizzes/:quizId", updateQuiz);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.delete("/api/courses/:courseId/quizzes/:quizId", deleteQuiz);
  app.get("/api/courses/:courseId/quizzes/:quizId/:userId/count", findNumberAttempts);
  app.post("/api/courses/:courseId/quizzes/:quizId/users/:userId", createAttempt);
}
