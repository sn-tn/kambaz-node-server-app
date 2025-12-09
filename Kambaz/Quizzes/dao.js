import model from "./model.js";

export default function QuizzesDao() {
  const findQuizzesForCourse = async (courseId) => {
    return await model.find({ course: courseId });
  };
  const findQuizById = async (quizId) => {
    return await model.findById(quizId);
  }
  const updateQuiz = async (quizId, quizUpdates) => {
    return await model.updateOne({_id: quizId}, {$set: quizUpdates});
  }
  const createQuiz = async (quiz) => {
    return await model.create(quiz);
  }
  const deleteQuiz = async (quizId) => {
    return await model.deleteOne({_id: quizId});
  }
  return {
    findQuizzesForCourse,
    findQuizById,
    updateQuiz,
    createQuiz,
    deleteQuiz,
  };
}
