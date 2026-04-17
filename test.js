window.onload = () => {

  let currentIndex = 0;
  let score = 0;

  function generateQuestions() {
    let progress = JSON.parse(localStorage.getItem("progress")) || {
      lessonsUnlocked: ["lesson1"]
    };

    let unlockedLessons = lessons.filter(l =>
      progress.lessonsUnlocked.includes(l.id)
    );

    if (unlockedLessons.length === 0) {
      unlockedLessons = [lessons[0]];
    }

    let latestLesson = unlockedLessons[unlockedLessons.length - 1];

    let baseSigns = latestLesson.signs || [];

    let otherSigns = unlockedLessons
      .slice(0, -1)
      .flatMap(l => l.signs);

    let testLength = Math.min(10, baseSigns.length + 3);

    let questions = [...baseSigns];

    while (questions.length < testLength && otherSigns.length > 0) {
      let rand = otherSigns[Math.floor(Math.random() * otherSigns.length)];
      questions.push(rand);
    }

    if (questions.length === 0) {
      questions = lessons[0].signs.slice(0, 5);
    }

    return questions.sort(() => Math.random() - 0.5);
  }

  let questions = generateQuestions();

  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const passInfo = document.getElementById("passInfo");
  const video = document.getElementById("video");
  const input = document.getElementById("answer");
  const feedback = document.getElementById("feedback");

  function loadQuestion() {
    const sign = questions[currentIndex];

    video.src = sign.video;
    input.value = "";
    feedback.textContent = "";

    progressText.textContent =
      `Question ${currentIndex + 1} of ${questions.length}`;

    let percent = (currentIndex / questions.length) * 100;
    progressBar.style.width = percent + "%";

    let needed = Math.ceil(0.7 * questions.length);
    passInfo.textContent =
      `Score: ${score} | Need ${needed} to pass`;
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
