window.onload = () => {

  const video = document.getElementById("video");
  const optionsDiv = document.getElementById("options");
  const feedback = document.getElementById("feedback");

  let useWeakOnly = false;
  let currentSign;

  function getAllSigns() {
    return lessons.flatMap(l => l.signs);
  }

  function loadQuestion() {
    let signs = getAllSigns();

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
      const rand = getAllSigns()[Math.floor(Math.random() * getAllSigns().length)];
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

  // weak practice
  window.startWeakPractice = function () {
    useWeakOnly = true;
    loadQuestion();
  };

  loadQuestion();
};
