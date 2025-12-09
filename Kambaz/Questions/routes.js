import QuestionsDao from "./dao.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionsRoutes(app) {
  const dao = QuestionsDao();
  const getQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
  };
  const getQuestionById = async (req, res) => {
    const { quizId, questionId } = req.params;
    const question = await dao.findQuestionById(quizId, questionId);
    res.json(question);
  };
  const createQuestionForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const newQuestion = {
      _id: uuidv4(),
      title: "New Question",
      points: 0,
      description: "New Description",
      choices: [],
      answers: [],
    };
    const question = await dao.createQuestion(quizId, newQuestion);
    res.json(question);
  };
  const updateQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const questionUpdates = req.body;
    const status = await dao.updateQuestion(
      quizId,
      questionId,
      questionUpdates
    );
    res.send(status);
  };
  const deleteQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.deleteQuestion(quizId, questionId);
    res.send(status);
  }
  app.get(
    "/api/courses/:courseId/quizzes/:quizId/questions",
    getQuestionsForQuiz
  );
  app.get(
    "/api/courses/:courseId/quizzes/:quizId/questions/:questionId",
    getQuestionById
  );
  app.post(
    "/api/courses/:courseId/quizzes/:quizId/questions",
    createQuestionForQuiz
  );
  app.put(
    "/api/courses/:courseId/quizzes/:quizId/questions/:questionId",
    updateQuestion
  );
  app.delete(
    "/api/courses/:courseId/quizzes/:quizId/questions/:questionId",
    deleteQuestion
  );
}
