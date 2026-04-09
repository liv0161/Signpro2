const lessonsContainer = document.getElementById("lessons");

const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";

const user = users[currentUser] || { progress: {} };


function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prev = user.progress[prevLesson.id];

  return prev && prev.score >= 70;
}


lessons.forEach((lesson, index) => {
  const div = document.createElement("div");

  const unlocked = isUnlocked(index);
  const score = user.progress[lesson.id]?.score ?? 0;

  div.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>Score: ${score}%</p>
    <button ${!unlocked ? "disabled" : ""} 
      onclick="startLesson('${lesson.id}')">
      ${unlocked ? "Start" : "Locked"}
    </button>
  `;

  lessonsContainer.appendChild(div);
});

function startLesson(id) {
  window.location.href = `lesson.html?id=${id}`;
}const lessonsContainer = document.getElementById("lessons");

const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";

const user = users[currentUser] || { progress: {} };


function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prev = user.progress[prevLesson.id];

  return prev && prev.score >= 70;
}


lessons.forEach((lesson, index) => {
  const div = document.createElement("div");

  const unlocked = isUnlocked(index);
  const score = user.progress[lesson.id]?.score ?? 0;

  div.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>Score: ${score}%</p>
    <button ${!unlocked ? "disabled" : ""} 
      onclick="startLesson('${lesson.id}')">
      ${unlocked ? "Start" : "Locked"}
    </button>
  `;

  lessonsContainer.appendChild(div);
});

function startLesson(id) {
  window.location.href = `lesson.html?id=${id}`;
}
