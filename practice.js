let currentSign;
let currentLessonId;

function pickRandom() {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUsername = localStorage.getItem("currentUser");

  if (!currentUsername || !users[currentUsername]) {
    console.log("No user found → using lesson 1");
    loadFromLesson(lessons[0]);
    return;
  }

  const user = users[currentUsername];
  if (!user.progress) user.progress = {};

  // check for unlocked lessons
  let availableLessons = [];

  for (let i = 0; i < lessons.length; i++) {
    if (i === 0) {
      availableLessons.push(lessons[i]);
    } else {
      const prev = lessons[i - 1];
      const data = user.progress[prev.id];

      if (data && data.accuracy >= 70) {
        availableLessons.push(lessons[i]);
      } else {
        break;
      }
    }
  }

 
  if (availableLessons.length === 0) {
    console.log("Fallback triggered → lesson 1");
    loadFromLesson(lessons[0]);
    return;
  }

  const lesson =
    availableLessons[Math.floor(Math.random() * availableLessons.length)];

  loadFromLesson(lesson);
}

// separate load (bc it decided to stop working)
function loadFromLesson(lesson) {
  currentLessonId = lesson.id;

  const sign =
    lesson.signs[Math.floor(Math.random() * lesson.signs.length)];

  currentSign = sign;

  console.log("Loaded sign:", sign.name);

  const video = document.getElementById("video");

  if (!video) {
    console.log("Video element missing");
    return;
  }

  video.pause();
  video.removeAttribute("src");
  video.load();

  video.src = sign.video;
  video.load();

  showOptions(sign.name);
}

// checks user's typed answer
function checkAnswer() {
  const input = document.getElementById("answer").value.toLowerCase();
  if (!currentSign) return;

  updateProgress(input === currentSign.name.toLowerCase());
  document.getElementById("answer").value = "";
}

// mcq
function selectOption(choice) {
  if (!currentSign) return;

  updateProgress(choice === currentSign.name);

  setTimeout(() => {
    nextSign();
  }, 1000);
}

// update progress
function updateProgress(correct) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUsername = localStorage.getItem("currentUser");

  if (!currentUsername || !users[currentUsername]) {
    console.log("No user → progress not saved");
    return;
  }

  const user = users[currentUsername];

  if (!user.progress) user.progress = {};

  if (!user.progress[currentLessonId]) {
    user.progress[currentLessonId] = {
      correct: 0,
      total: 0,
      accuracy: 0
    };
  }

  const data = user.progress[currentLessonId];

  data.total++;

  if (correct) {
    data.correct++;
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText =
      "Wrong! Correct answer: " + currentSign.name;
  }

  data.accuracy = Math.round((data.correct / data.total) * 100);

  // save
  users[currentUsername] = user;
  localStorage.setItem("users", JSON.stringify(users));

  console.log("Updated progress:", user.progress);
}

// changes sign to next
function nextSign() {
  document.getElementById("feedback").innerText = "";
  document.getElementById("answer").value = "";
  pickRandom();
}

// mcq options
function showOptions(correctAnswer) {
  const allSigns = lessons.flatMap(l => l.signs);

  if (!allSigns.length) return;

  const options = [correctAnswer];

  while (options.length < 4) {
    const random =
      allSigns[Math.floor(Math.random() * allSigns.length)].name;

    if (!options.includes(random)) {
      options.push(random);
    }
  }

  options.sort(() => Math.random() - 0.5);

  const container = document.getElementById("options");
  container.innerHTML = "";

  options.forEach(opt => {
    container.innerHTML += `
      <button onclick="selectOption('${opt}')">${opt}</button>
    `;
  });
}

// loads first sign
window.onload = pickRandom;
