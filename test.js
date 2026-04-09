const video = document.getElementById("testVideo");
const questionDiv = document.getElementById("question");
const feedback = document.getElementById("feedback");

const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";

if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

const user = users[currentUser];

// unlock logic
function isUnlocked(index) {
  if (index === 0) return true;

  const prev = user.progress[lessons[index - 1].id];
  return prev && prev.score >= 70;
}

const unlockedLessons = lessons.filter((l, i) => isUnlocked(i));

const TOTAL_QUESTIONS = 10;

let currentSign;
let questionNumber = 0;
let correct = 0;

//  load sign
function loadSign() {
  const lesson =
    unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

  currentSign =
    lesson.signs[Math.floor(Math.random() * lesson.signs.length)];

  video.src = currentSign.video;
  video.load();
}

//  load question
function loadQuestion() {
  questionDiv.innerHTML = "";

  const correctAnswer = currentSign.name;
  const options = [correctAnswer];

  while (options.length < 4) {
    const randLesson =
      lessons[Math.floor(Math.random() * lessons.length)];
    const randSign =
      randLesson.signs[Math.floor(Math.random() * randLesson.signs.length)];

    if (!options.includes(randSign.name)) {
      options.push(randSign.name);
    }
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => checkAnswer(opt, correctAnswer);

    questionDiv.appendChild(btn);
  });
}

// check answer
function checkAnswer(selected, correctAnswer) {
  questionNumber++;

  if (selected === correctAnswer) {
    correct++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect. Answer: ${correctAnswer}`;
  }

  // end test
  if (questionNumber >= TOTAL_QUESTIONS) {
    setTimeout(finishTest, 1000);
  } else {
    setTimeout(() => {
      feedback.textContent = "";
      loadSign();
      loadQuestion();
    }, 1000);
  }
}


function finishTest() {
  const score = Math.round((correct / TOTAL_QUESTIONS) * 100);

  feedback.textContent = `Final Score: ${score}%`;

  const currentLessonIndex = unlockedLessons.length - 1;
  const currentLesson = lessons[currentLessonIndex];

  user.progress[currentLesson.id] = {
    score: score
  };

  localStorage.setItem("users", JSON.stringify(users));

  if (score >= 70) {
    feedback.textContent += "Next lesson unlocked!";
  } else {
    feedback.textContent += "Try again.";
  }
}

// strt test
if (unlockedLessons.length > 0) {
  loadSign();
  loadQuestion();
} else {
  feedback.textContent = "No lessons unlocked.";
}
