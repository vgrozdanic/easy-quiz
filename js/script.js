let questionCounter = 1;

function renderPlayQuizQuestions() {
  const urlParams = new URLSearchParams(window.location.search);
  quizData = urlParams.get("data");
  const quizQuestions = JSON.parse(atob(quizData));

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

function renderQuizForEditing(quizData) {
  const quizQuestions = JSON.parse(atob(quizData));

  const createQuizDiv = document.getElementById("createQuizDiv");
  createQuizDiv.style.display = "block";
  const createQuizH1 = document.getElementById("createQuizH1");
  createQuizH1.style.display = "block";

  const playQuizDiv = document.getElementById("playQuizDiv");
  playQuizDiv.style.display = "none";
  const playQuizH1 = document.getElementById("playQuizH1");
  playQuizH1.style.display = "none";
  const playQuizNavbar = document.getElementById("playQuizNavbar");
  playQuizNavbar.style.display = "none";

  questionCounter = quizQuestions.length;

  quizQuestions.forEach((quizQuestion, idx) => {
    const questionsContainer = document.getElementById("questionsContainer");

    const newQuestionDiv = document.createElement("div");
    newQuestionDiv.classList.add("question");

    const labelQuestion = document.createElement("label");
    labelQuestion.htmlFor = `question${idx + 1}`;
    labelQuestion.textContent = `Question ${idx + 1}:`;
    newQuestionDiv.appendChild(labelQuestion);

    const inputQuestion = document.createElement("input");
    inputQuestion.type = "text";
    inputQuestion.id = `question${idx + 1}`;
    inputQuestion.name = `question${idx + 1}`;
    inputQuestion.required = true;
    inputQuestion.value = quizQuestion.question;
    newQuestionDiv.appendChild(inputQuestion);

    const labelAnswer = document.createElement("label");
    labelAnswer.htmlFor = `answer${idx + 1}`;
    labelAnswer.textContent = "Answer:";
    newQuestionDiv.appendChild(labelAnswer);

    const inputAnswer = document.createElement("input");
    inputAnswer.type = "text";
    inputAnswer.id = `answer${idx + 1}`;
    inputAnswer.name = `answer${idx + 1}`;
    inputAnswer.required = true;
    inputAnswer.value = quizQuestion.answer;
    newQuestionDiv.appendChild(inputAnswer);

    questionsContainer.appendChild(newQuestionDiv);
  });
}

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
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("data", base64QuizData);
  urlParams.set("playable", true);

  window.location.search = urlParams.toString();

  // Prevent the form from actually submitting
  return false;
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get("data");
  const playable = urlParams.get("playable");

  console.log(playable);
  if (playable !== null && playable === "true") {
    // if there is data in the URL, show the quiz, not create quiz form
    const createQuizDiv = document.getElementById("createQuizDiv");
    createQuizDiv.style.display = "none";
    const createQuizH1 = document.getElementById("createQuizH1");
    createQuizH1.style.display = "none";

    const playQuizDiv = document.getElementById("playQuizDiv");
    playQuizDiv.style.display = "block";
    const playQuizH1 = document.getElementById("playQuizH1");
    playQuizH1.style.display = "block";
    const playQuizNavbar = document.getElementById("playQuizNavbar");
    playQuizNavbar.style.display = "block";

    renderPlayQuizQuestions();
    return;
  }

  if (data !== null && playable !== null && playable === "false") {
    // render the quiz for editing
    renderQuizForEditing(data);
  }
};
