window.onload = () => {

  let currentIndex = 0;
  let score = 0;

  //unlocked signs only
  function getUnlockedSigns() {
    let progress = JSON.parse(localStorage.getItem("progress")) || {
      signs: {},
      lessonsUnlocked: ["lesson1"]
    };

    return lessons
      .filter(lesson => progress.lessonsUnlocked.includes(lesson.id))
      .flatMap(lesson => lesson.signs);
  }

  let allSigns = getUnlockedSigns();

  // safety check
  if (allSigns.length === 0) {
    alert("No unlocked lessons yet!");
    return;
  }

  // random 10 questions
  let questions = allSigns
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const passInfo = document.getElementById("passInfo");
  const video = document.getElementById("video");
  const input = document.getElementById("answer");
  const feedback = document.getElementById("feedback");

  function generateQuestions() {
  let progress = JSON.parse(localStorage.getItem("progress")) || {
    lessonsUnlocked: ["lesson1"]
  };

  let unlockedLessons = lessons.filter(l =>
    progress.lessonsUnlocked.includes(l.id)
  );

  let latestLesson = unlockedLessons[unlockedLessons.length - 1];

  let baseSigns = latestLesson.signs;

  let otherSigns = unlockedLessons
    .slice(0, -1)
    .flatMap(l => l.signs);

  // dynamic test length
  let testLength = Math.min(10, baseSigns.length + 3);

  let questions = [...baseSigns];

  while (questions.length < testLength && otherSigns.length > 0) {
    let rand = otherSigns[Math.floor(Math.random() * otherSigns.length)];
    questions.push(rand);
  }

  // shuffle
  questions = questions.sort(() => Math.random() - 0.5);

  return questions;
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

  function updateSign(name, correct) {
    let progress = JSON.parse(localStorage.getItem("progress")) || {
      signs: {},
      lessonsUnlocked: ["lesson1"]
    };

    if (!progress.signs[name]) {
      progress.signs[name] = { correct: 0, attempts: 0 };
    }

    progress.signs[name].attempts++;
    if (correct) progress.signs[name].correct++;

    localStorage.setItem("progress", JSON.stringify(progress));
  }

  function finishTest() {
  let accuracy = Math.round((score / questions.length) * 100);

  let progress = JSON.parse(localStorage.getItem("progress")) || {
    signs: {},
    lessonsUnlocked: ["lesson1"]
  };

  let needed = Math.ceil(0.7 * questions.length);

  // unlock next lesson
  if (score >= needed) {
    let currentUnlocked = progress.lessonsUnlocked.length;

    if (currentUnlocked < lessons.length) {
      let nextLesson = lessons[currentUnlocked].id;

      if (!progress.lessonsUnlocked.includes(nextLesson)) {
        progress.lessonsUnlocked.push(nextLesson);
      }
    }
  }

  localStorage.setItem("progress", JSON.stringify(progress));

  // save test summary
  localStorage.setItem("lastTest", JSON.stringify({
    score: score,
    total: questions.length,
    accuracy: accuracy
  }));

  document.body.innerHTML = `
    <h1>Test Complete</h1>
    <p>Score: ${score}/${questions.length}</p>
    <p>Accuracy: ${accuracy}%</p>

    <button onclick="window.location.href='course.html'">
      Back to Course
    </button>

    <button onclick="window.location.href='progress.html'">
      View Progress
    </button>
  `;
}

  loadQuestion();
};
