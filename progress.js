// load or create progress
let progress = JSON.parse(localStorage.getItem("progress")) || {
  signs: {},
  lessonsUnlocked: ["lesson1"]
};

// save progress
function saveProgress() {
  localStorage.setItem("progress", JSON.stringify(progress));
}

// update a sign result
function updateSign(name, isCorrect) {
  if (!progress.signs[name]) {
    progress.signs[name] = { correct: 0, wrong: 0 };
  }

  if (isCorrect) {
    progress.signs[name].correct++;
  } else {
    progress.signs[name].wrong++;
  }

  saveProgress();
}

// calculate accuracy
function getAccuracy() {
  let correct = 0;
  let total = 0;

  for (let sign in progress.signs) {
    correct += progress.signs[sign].correct;
    total += progress.signs[sign].correct + progress.signs[sign].wrong;
  }

  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
