const container = document.getElementById("lessons");

// clear jic
container.innerHTML = "";

// get user data
let users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = "user1";

// make sure structure exists
if (!users[currentUser]) {
  users[currentUser] = { progress: {} };
}

if (!users[currentUser].progress) {
  users[currentUser].progress = {};
}

const user = users[currentUser];

// unlock logic
function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prevData = user.progress[prevLesson.id];

  return prevData && prevData.score >= 70;
}

// lessons
lessons.forEach((lesson, index) => {
  div.className = "card";
const unlocked = isUnlocked(index);
const score = user.progress[lesson.id]?.score || 0;

div.innerHTML = `
  <h3>${lesson.title}</h3>

  <div style="background:#ddd;height:10px;border-radius:5px;">
    <div style="
      width:${score}%;
      height:10px;
      background:#4CAF50;
      border-radius:5px;
    "></div>
  </div>

  <p>${score}% complete</p>

  <button ${!unlocked ? "disabled" : ""} onclick="startLesson('${lesson.id}')">
    ${unlocked ? "Start" : "Locked"}
  </button>
`;
  container.appendChild(div);
});

// navigation
function startLesson(id) {
  window.location.href = "lesson.html?id=" + id;
}

// save back
localStorage.setItem("users", JSON.stringify(users));
