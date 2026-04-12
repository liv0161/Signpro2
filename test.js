let currentIndex = 0;
let score = 0;
let questions = lessons.flatMap(l => l.signs);

function loadQuestion() {
  const sign = questions[currentIndex];

  document.getElementById("video").src = sign.video;
  document.getElementById("answer").value = "";
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const correctAnswer = questions[currentIndex].name;

  let isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

  if (isCorrect) {
    score++;
  }

  // update progress
  updateSign(correctAnswer, isCorrect);

  currentIndex++;

  if (currentIndex >= questions.length) {
    finishTest();
  } else {
    loadQuestion();
  }
}

function finishTest() {
  let accuracy = Math.round((score / questions.length) * 100);

  document.body.innerHTML = `
    <h1>Test Complete!</h1>
    <p>Score: ${score}/${questions.length}</p>
    <p>Accuracy: ${accuracy}%</p>

    <button onclick="window.location.href='progress.html'">
      View Progress
    </button>

    <button onclick="window.location.href='course.html'">
      Back to Course
    </button>
  `;
}

loadQuestion();
