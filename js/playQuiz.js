function submitPlayQuiz() {
  const urlParams = new URLSearchParams(window.location.search);
  quizData = urlParams.get("data");
  const quizQuestions = JSON.parse(atob(quizData));

  let score = 0;
  quizQuestions.forEach((quizQuestion, idx) => {
    const userAnswer = document.getElementById(`playQuizAnswer${idx}`).value;
    if (userAnswer === quizQuestion.answer) {
      score++;
    }
  });

  const playQuizResult = document.getElementById("playQuizResult");
  playQuizResult.style.display = "block";

  const playQuizResultText = document.getElementById("playQuizResultText");
  playQuizResultText.textContent = `You scored ${score} out of ${quizQuestions.length}!`;

  // prevent the form from actually submitting
  return false;
}
