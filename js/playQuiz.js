function renderPlayQuizQuestions(quizData) {
  const quizQuestions = JSON.parse(atob(quizData));
  console.log(quizQuestions);

  const playQuizContainer = document.getElementById("playQuizContainer");

  quizQuestions.forEach((quizQuestion, idx) => {
    const newQuestionDiv = document.createElement("div");
    newQuestionDiv.classList.add("playQuizQuestion");

    const labelQuestion = document.createElement("label");
    labelQuestion.htmlFor = `playQuizQuestion${idx}`;
    labelQuestion.textContent = quizQuestion.question;
    newQuestionDiv.appendChild(labelQuestion);

    const inputAnswer = document.createElement("input");
    inputAnswer.type = "text";
    inputAnswer.id = `playQuizAnswer${idx}`;
    inputAnswer.name = `playQuizAnswer${idx}`;
    inputAnswer.required = true;
    newQuestionDiv.appendChild(inputAnswer);

    playQuizContainer.appendChild(newQuestionDiv);
  });
}

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
