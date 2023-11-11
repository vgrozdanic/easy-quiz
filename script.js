let questionCounter = 1;

function addQuestion() {
  questionCounter++;

  const questionsContainer = document.getElementById("questionsContainer");

  const newQuestionDiv = document.createElement("div");
  newQuestionDiv.classList.add("question");

  const labelQuestion = document.createElement("label");
  labelQuestion.htmlFor = `question${questionCounter}`;
  labelQuestion.textContent = `Question ${questionCounter}:`;
  newQuestionDiv.appendChild(labelQuestion);

  const inputQuestion = document.createElement("input");
  inputQuestion.type = "text";
  inputQuestion.id = `question${questionCounter}`;
  inputQuestion.name = `question${questionCounter}`;
  inputQuestion.required = true;
  newQuestionDiv.appendChild(inputQuestion);

  const labelAnswer = document.createElement("label");
  labelAnswer.htmlFor = `answer${questionCounter}`;
  labelAnswer.textContent = "Answer:";
  newQuestionDiv.appendChild(labelAnswer);

  const inputAnswer = document.createElement("input");
  inputAnswer.type = "text";
  inputAnswer.id = `answer${questionCounter}`;
  inputAnswer.name = `answer${questionCounter}`;
  inputAnswer.required = true;
  newQuestionDiv.appendChild(inputAnswer);

  questionsContainer.appendChild(newQuestionDiv);
}

function submitForm() {
  // Build JSON object from the form data
  quizData = [];
  for (let i = 1; i <= questionCounter; i++) {
    const question = document.getElementById(`question${i}`).value;
    const answer = document.getElementById(`answer${i}`).value;
    quizData.push({ question, answer });
  }

  // Encode the JSON object in base64
  const base64QuizData = btoa(JSON.stringify(quizData));

  // Add the base64-encoded data as a URL parameter
  window.location.href = `?data=${base64QuizData}`;

  // Prevent the form from actually submitting
  return false;
}

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

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  quizData = urlParams.get("data");

  if (quizData !== null) {
    // if there is data in the URL, show the quiz, not create quiz form
    const createQuizDiv = document.getElementById("createQuizDiv");
    createQuizDiv.style.display = "none";
    const createQuizH1 = document.getElementById("createQuizH1");
    createQuizH1.style.display = "none";

    const playQuizDiv = document.getElementById("playQuizDiv");
    playQuizDiv.style.display = "block";
    const playQuizH1 = document.getElementById("playQuizH1");
    playQuizH1.style.display = "block";

    renderPlayQuizQuestions(quizData);
  }
};
