function onClickEditQuiz() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("playable", false);
  window.location.search = urlParams.toString();
}

function onClickCreateNewQuiz() {
  window.location.search = "";
}

function onClickShareThisQuiz() {
  navigator.clipboard.writeText(window.location.href);
  alert("Copied to clipboard!");
}
