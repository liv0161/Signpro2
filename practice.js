const video = document.getElementById("practiceVideo");
const question = document.getElementById("question");
const feedback = document.getElementById("feedback");

const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";

if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

const user = users[currentUser];

// unlock logic that matches course.js
function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prevData = user.progress[prevLesson.id];

  return prevData && prevData.accuracy >= 70;
}

// get unlocked lessons
const unlockedLessons = lessons.filter((lesson, index) =>
  isUnlocked(index)
);

if (unlockedLessons.length === 0) {
  feedback.textContent = "No unlocked lessons yet!";
}

// pick a random lesson & sign
let currentLesson =
  unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

let currentSign =
  currentLesson.signs[Math.floor(Math.random() * currentLesson.signs.length)];

// load video
video.src = currentSign.video;
video.load();
video.play().catch(() => {});

// create question
function loadQuestion() {
  question.innerHTML = "";

  const correctAnswer = currentSign.name;

  const options = [correctAnswer];

  // add random wrong answers
  while (options.length < 4) {
    const randomLesson =
      lessons[Math.floor(Math.random() * lessons.length)];
    const randomSign =
      randomLesson.signs[
        Math.floor(Math.random() * randomLesson.signs.length)
      ];

    if (!options.includes(randomSign.name)) {
      options.push(randomSign.name);
    }
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => checkAnswer(option, correctAnswer);

    question.appendChild(btn);
  });
}

// update accuracy
let correct = 0;
let total = 0;

function checkAnswer(selected, correctAnswer) {
  total++;

  if (selected === correctAnswer) {
    correct++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Wrong! Answer: ${correctAnswer}`;
  }

  const accuracy = Math.round((correct / total) * 100);

  feedback.textContent += ` | Accuracy: ${accuracy}%`;

  // const video = document.getElementById("practiceVideo");
const question = document.getElementById("question");
const feedback = document.getElementById("feedback");

const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";

if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

const user = users[currentUser];

// 🔓 Unlock logic (same as course.js)
function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prevData = user.progress[prevLesson.id];

  return prevData && prevData.accuracy >= 70;
}

// 🧠 GET ONLY UNLOCKED LESSONS
const unlockedLessons = lessons.filter((lesson, index) =>
  isUnlocked(index)
);

// 🚨 SAFETY CHECK
if (unlockedLessons.length === 0) {
  feedback.textContent = "No unlocked lessons yet!";
}

// 🎯 PICK RANDOM LESSON + SIGN
let currentLesson =
  unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

let currentSign =
  currentLesson.signs[Math.floor(Math.random() * currentLesson.signs.length)];

// ▶️ LOAD VIDEO
video.src = currentSign.video;
video.load();
video.play().catch(() => {});

// ❓ CREATE QUESTION
function loadQuestion() {
  question.innerHTML = "";

  const correctAnswer = currentSign.name;

  const options = [correctAnswer];

  // add random wrong answers
  while (options.length < 4) {
    const randomLesson =
      lessons[Math.floor(Math.random() * lessons.length)];
    const randomSign =
      randomLesson.signs[
        Math.floor(Math.random() * randomLesson.signs.length)
      ];

    if (!options.includes(randomSign.name)) {
      options.push(randomSign.name);
    }
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => checkAnswer(option, correctAnswer);

    question.appendChild(btn);
  });
}

// 📊 TRACK ACCURACY
let correct = 0;
let total = 0;

function checkAnswer(selected, correctAnswer) {
  total++;

  if (selected === correctAnswer) {
    correct++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Wrong! Answer: ${correctAnswer}`;
  }

  const accuracy = Math.round((correct / total) * 100);

  feedback.textContent += ` | Accuracy: ${accuracy}%`;

  // update lesson progress
  user.progress[currentLesson.id] = {
    accuracy: accuracy,
  };

  localStorage.setItem("users", JSON.stringify(users));

  // load next sign
  nextQuestion();
}

function nextQuestion() {
  currentLesson =
    unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

  currentSign =
    currentLesson.signs[
      Math.floor(Math.random() * currentLesson.signs.length)
    ];

  video.src = currentSign.video;
  video.load();
  video.play().catch(() => {});

  loadQuestion();
}


loadQuestion();
  user.progress[currentLesson.id] = {
    accuracy: accuracy,
  };

  localStorage.setItem("users", JSON.stringify(users));

  // load next sign
  nextQuestion();
}

function nextQuestion() {
  currentLesson =
    unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

  currentSign =
    currentLesson.signs[
      Math.floor(Math.random() * currentLesson.signs.length)
    ];

  video.src = currentSign.video;
  video.load();
  video.play().catch(() => {});

  loadQuestion();
}

loadQuestion();
