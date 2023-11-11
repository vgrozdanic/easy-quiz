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
