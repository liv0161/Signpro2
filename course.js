alert("course.js is running");
let users = JSON.parse(localStorage.getItem("users")) || {};

// get storage
let users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = "user1";

// ensure user exists
if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

// ensure progress exists
if (!users[currentUser].progress) {
  users[currentUser].progress = {};
}

const user = users[currentUser];

// unlock logic
function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];

  if (!user.progress[prevLesson.id]) return false;

  return user.progress[prevLesson.id].score >= 70;
}

container.innerHTML = "";

// render lessons SAFELY
lessons.forEach((lesson, index) => {
  try {
    const div = document.createElement("div");

    const unlocked = isUnlocked(index);

    const score = user.progress[lesson.id]
      ? user.progress[lesson.id].score
      : 0;

    div.innerHTML = `
      <h3>${lesson.title}</h3>
      <p>Score: ${score}%</p>
      <button ${!unlocked ? "disabled" : ""} onclick="startLesson('${lesson.id}')">
        ${unlocked ? "Start" : "Locked"}
      </button>
    `;

    container.appendChild(div);

  } catch (err) {
    console.log("Error rendering lesson:", lesson, err);
  }
});

// navigation
function startLesson(id) {
  window.location.href = "lesson.html?id=" + id;
}

// save back
localStorage.setItem("users", JSON.stringify(users));
