import model from "./model.js";

export default function QuizResultsDao() {
  const findQuizResults = async (userId) => {
    return await model.find({user: userId});
  }
  const findNumberAttempts = async (quizId, userId) => {
    return await model.countDocuments({quiz: quizId, user: userId});
  }
  const createAttempt = async (attempt) => { 
    return await model.create(attempt);
  }
  const deleteAllQuizResultsForQuiz = async (quizId) => {
    return await model.deleteMany({quiz: quizId});
  }
  return {
    findQuizResults,
    findNumberAttempts,
    createAttempt,
    deleteAllQuizResultsForQuiz,
  };

}