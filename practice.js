const video = document.getElementById("practiceVideo");
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

  const prevLesson = lessons[index - 1];
  const prevData = user.progress[prevLesson.id];

  return prevData && prevData.accuracy >= 70;
}

//only use unlocked lessons
const unlockedLessons = lessons.filter((lesson, index) =>
  isUnlocked(index)
);

let currentLesson;
let currentSign;

let correct = 0;
let total = 0;

// load sign
function loadSign() {
  currentLesson =
    unlockedLessons[Math.floor(Math.random() * unlockedLessons.length)];

  currentSign =
    currentLesson.signs[
      Math.floor(Math.random() * currentLesson.signs.length)
    ];

  video.src = currentSign.video;
  video.load();
  video.play().catch(() => {});
}

// load mcq or type in question
function loadQuestion() {
  questionDiv.innerHTML = "";

  const isTyping = Math.random() < 0.4; // 40% typing questions

  if (isTyping) {
    
    const input = document.createElement("input");
    input.placeholder = "Type your answer";

    const btn = document.createElement("button");
    btn.textContent = "Submit";

    btn.onclick = () => {
      checkAnswer(input.value.trim(), currentSign.name);
    };

    questionDiv.appendChild(input);
    questionDiv.appendChild(btn);

  } else {
    // mcq question
    const correctAnswer = currentSign.name;
    const options = [correctAnswer];

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

      btn.onclick = () => {
        checkAnswer(option, correctAnswer);
      };

      questionDiv.appendChild(btn);
    });
  }
}

// check answer
function checkAnswer(selected, correctAnswer) {
  total++;

  if (selected.toLowerCase() === correctAnswer.toLowerCase()) {
    correct++;
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = `Incorrect the sign is: ${correctAnswer}`;
  }

  const accuracy = Math.round((correct / total) * 100);

  feedback.textContent += ` | Accuracy: ${accuracy}%`;

  // save progress
  user.progress[currentLesson.id] = {
    accuracy: accuracy,
  };

  localStorage.setItem("users", JSON.stringify(users));

  // change sign
  setTimeout(() => {
    loadNext();
  }, 1500);
}

// next sign
function loadNext() {
  feedback.textContent = "";

  loadSign();
  loadQuestion();
}

// start
if (unlockedLessons.length > 0) {
  loadSign();
  loadQuestion();
} else {
  feedback.textContent = "No lessons unlocked yet!";
}
