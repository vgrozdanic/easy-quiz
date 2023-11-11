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
    const playQuizNavbar = document.getElementById("playQuizNavbar");
    playQuizNavbar.style.display = "block";

    renderPlayQuizQuestions(quizData);
  }
};
