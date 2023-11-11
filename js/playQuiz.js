function submitPlayQuiz() {
  const urlParams = new URLSearchParams(window.location.search);
  quizData = urlParams.get("data");
  const quizQuestions = JSON.parse(atob(quizData));

  let score = 0;
  quizQuestions.forEach((quizQuestion, idx) => {
    const answerElement = document.getElementById(`playQuizAnswer${idx}`);
    const userAnswer = answerElement.value;
    if (
      userAnswer.trim().toLowerCase() ===
      quizQuestion.answer.trim().toLowerCase()
    ) {
      score++;
      // make the border green when the answer is correct
      answerElement.style.borderColor = "green";
      answerElement.style.borderStyle = "solid";
    } else {
      // make the border red when the answer is wrong
      answerElement.style.borderColor = "red";
      answerElement.style.borderStyle = "solid";
    }
  });

  const playQuizResult = document.getElementById("playQuizResult");
  playQuizResult.style.display = "block";

  const playQuizResultText = document.getElementById("playQuizResultText");
  playQuizResultText.textContent = `You scored ${score} out of ${quizQuestions.length}!`;

  // prevent the form from actually submitting
  return false;
}
