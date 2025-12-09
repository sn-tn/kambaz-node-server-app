import model from "../Quizzes/model.js";

export default function QuestionsDao() {
  const findQuestionsForQuiz = async (quizId) => { 
    const quiz = await model.findOne({ _id: quizId });
    return quiz.questions;
  };
  const findQuestionById = async (quizId, questionId) => {
    const { questions } = await model.findOne({ _id: quizId });
    return questions.find((question) => question._id === questionId);
  };
  const createQuestion = async (quizId, question) => {
    await model.updateOne({ _id: quizId }, { $push: { questions: question } });
    return question;
  };
  const deleteQuestion = async (quizId, questionId) => {
    const status = await model.updateOne(
      { _id: quizId },
      { $pull: { questions: { _id: questionId } } }
    );
    return status;
  };
  const updateQuestion = async (quizId, questionId, questionUpdates) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    Object.assign(question, questionUpdates);
    await quiz.save();
    return question;
  }
  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestion,
    deleteQuestion,
    updateQuestion,
  };
}
