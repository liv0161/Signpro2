window.onload = () => {

  const video = document.getElementById("video");
  const optionsDiv = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let useWeakOnly = false;
  let currentSign;

  // only unlocked signs
  function getUnlockedSigns() {
    let progress = JSON.parse(localStorage.getItem("progress")) || {
      signs: {},
      lessonsUnlocked: ["lesson1"]
    };

    return lessons
      .filter(lesson => progress.lessonsUnlocked.includes(lesson.id))
      .flatMap(lesson => lesson.signs);
  }

  function getWeakSigns() {
    let progress = JSON.parse(localStorage.getItem("progress")) || { signs: {} };

    let weak = [];

    for (let sign in progress.signs) {
      let data = progress.signs[sign];

      let attempts = data.attempts || 0;
      let correct = data.correct || 0;

      if (attempts === 0) continue;

      let accuracy = correct / attempts;

      if (accuracy < 0.7) {
        weak.push(sign);
      }
    }

    return weak;
  }

  function loadQuestion() {
    let signs = getUnlockedSigns();

    if (useWeakOnly) {
      const weak = getWeakSigns();
      signs = signs.filter(s => weak.includes(s.name));
    }

    if (signs.length === 0) {
      feedback.textContent = "No signs available yet!";
      return;
    }

    currentSign = signs[Math.floor(Math.random() * signs.length)];

    video.src = currentSign.video;
    optionsDiv.innerHTML = "";

    const answers = [currentSign.name];

    while (answers.length < 4) {
      const rand = getUnlockedSigns()[Math.floor(Math.random() * getUnlockedSigns().length)];

      if (!answers.includes(rand.name)) {
        answers.push(rand.name);
      }
    }

    answers.sort(() => Math.random() - 0.5);

    answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.textContent = ans;
      btn.onclick = () => check(ans);
      optionsDiv.appendChild(btn);
    });
  }

  function check(ans) {
    const isCorrect = ans === currentSign.name;

    updateSign(currentSign.name, isCorrect);

    feedback.textContent = isCorrect ? "Correct" : "Incorrect";

    setTimeout(loadQuestion, 800);
  }

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

  // weak ssigns practice button
  window.startWeakPractice = function () {
    useWeakOnly = true;
    loadQuestion();
  };

  loadQuestion();
};
