export const QUIZ_RESULT_STORAGE_KEY = "firstfile-tax-quiz-result";

export function gradeQuiz(questions, selectedAnswers = {}) {
  const results = questions.map((question, index) => {
    const answerIndex = selectedAnswers[index];
    const selectedIndex = Number.isInteger(answerIndex) && question.options[answerIndex]
      ? answerIndex
      : null;

    return {
      id: question.id,
      scenario: question.scenario,
      question: question.question,
      selectedAnswer: selectedIndex === null ? null : question.options[selectedIndex],
      correctAnswer: question.options[question.correctIndex],
      isCorrect: selectedIndex === question.correctIndex,
      explanation: question.explanation,
      sourceTitle: question.sourceTitle,
      sourceUrl: question.sourceUrl,
    };
  });

  const correct = results.filter((result) => result.isCorrect).length;

  return {
    total: questions.length,
    answered: results.filter((result) => result.selectedAnswer !== null).length,
    correct,
    percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    results,
  };
}