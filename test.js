alert("test.js is running");
const video = document.getElementById("video");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");

// load user data
let users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = "user1";

if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

if (!users[currentUser].progress) {
  users[currentUser].progress = {};
}

const user = users[currentUser];

let question = 0;
let correct = 0;
const TOTAL = 5;

let currentSign;
let currentLesson; // track lesson

// get unlocked lessons
function getUnlockedLessons() {
  return lessons.filter((lesson, index) => {
    if (index === 0) return true;

    const prev = user.progress[lessons[index - 1].id];
    return prev && prev.score >= 70;
  });
}

function loadQuestion() {
  const unlocked = getUnlockedLessons();

  //fallback
  if (!unlocked || unlocked.length === 0) {
    currentLesson = lessons[0];
  } else if (!currentLesson) {
    currentLesson = unlocked[unlocked.length - 1];
  }

  if (!currentLesson || !currentLesson.signs.length) {
    feedback.textContent = "Error loading lesson";
    return;
  }

  currentSign =
    currentLesson.signs[
      Math.floor(Math.random() * currentLesson.signs.length)
    ];

  video.src = currentSign.video;

  optionsDiv.innerHTML = "";

  const answers = [currentSign.name];

  while (answers.length < 4) {
    const randLesson =
      lessons[Math.floor(Math.random() * lessons.length)];
    const randSign =
      randLesson.signs[
        Math.floor(Math.random() * randLesson.signs.length)
      ];

    if (!answers.includes(randSign.name)) {
      answers.push(randSign.name);
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
function check(answer) {
  question++;

  if (answer === currentSign.name) {
    correct++;
    feedback.textContent = "Correct";
  } else {
    feedback.textContent = "Wrong";
  }

  if (question >= TOTAL) {
    finish();
  } else {
    setTimeout(loadQuestion, 800);
  }
}

function finish() {
  const score = Math.round((correct / TOTAL) * 100);

  // show score
  feedback.innerHTML = `
    <h2>Final Score: ${score}%</h2>
    <p>${score >= 70 ? "Lesson Passed 🎉" : "Try Again"}</p>
  `;

  // reload users
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[currentUser]) {
    users[currentUser] = { progress: {} };
  }

  if (!users[currentUser].progress) {
    users[currentUser].progress = {};
  }

  // save score to lesson
  users[currentUser].progress[currentLesson.id] = {
    score: score
  };

  // save
  localStorage.setItem("users", JSON.stringify(users));

  console.log("Saved progress:", users);
}
console.log("Lessons",lessons);
// start
loadQuestion();
