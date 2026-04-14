window.onload = () => {

  let currentIndex = 0;
  let score = 0;
  let allSigns = lessons.flatMap(l => l.signs);
  let questions = allSgns
    .sort(() => Math.random()-0.5)
    .slice(0,10)

  const progressText = document.getElementById("progressText");
  const video = document.getElementById("video");
  const input = document.getElementById("answer");
  const feedback = document.getElementById("feedback");

  function loadQuestion() {
    const sign = questions[currentIndex];

    video.src = sign.video;
    input.value = "";
    feedback.textContent = "";
    progressText.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  }

  window.submitAnswer = function () {
    const userAnswer = input.value.trim();
    const correctAnswer = questions[currentIndex].name;

    const isCorrect =
      userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    if (isCorrect) score++;

    updateSign(correctAnswer, isCorrect);

    feedback.textContent = isCorrect ? "Correct" : "Incorrect";

    currentIndex++;

    setTimeout(() => {
      if (currentIndex >= questions.length) {
        finishTest();
      } else {
        loadQuestion();
      }
    }, 800);
  };

  function finishTest() {
    let accuracy = Math.round((score / questions.length) * 100);

    document.body.innerHTML = `
      <h1>Test Complete</h1>
      <p>Score: ${score}/${questions.length}</p>
      <p>Accuracy: ${accuracy}%</p>

      <button onclick="window.location.href='progress.html'">
        View Progress
      </button>
    `;
  }

  loadQuestion();
};
