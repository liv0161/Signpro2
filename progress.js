// load/create progress
let progress = JSON.parse(localStorage.getItem("progress")) || {
  signs: {},
  lessonsUnlocked: ["lesson1"]
};

// save
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

// accuracy
function getAccuracy() {
  let correct = 0;
  let total = 0;

  for (let sign in progress.signs) {
    correct += progress.signs[sign].correct;
    total += progress.signs[sign].correct + progress.signs[sign].wrong;
  }

  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

// weak signs
function getWeakSigns() {
  return Object.keys(progress.signs).filter(sign => {
    const data = progress.signs[sign];
    return data.wrong > data.correct;
  });
}

// strong signs
function getStrongSigns() {
  return Object.keys(progress.signs).filter(sign => {
    const data = progress.signs[sign];
    return data.correct >= 3 && data.correct > data.wrong;
  });
}

// suggested lessons
function getSuggestedLessons() {
  const weakSigns = getWeakSigns();
  const lessonsToRevise = new Set();

  lessons.forEach(lesson => {
    lesson.signs.forEach(sign => {
      if (weakSigns.includes(sign.name)) {
        lessonsToRevise.add(lesson.title);
      }
    });
  });

  return Array.from(lessonsToRevise);
}
