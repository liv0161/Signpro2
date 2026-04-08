const container = document.getElementById("lessons");

// get user
const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser") || "testUser";
const user = users[currentUser] || { progress: {} };

// unlock logic that matches practice
function isUnlocked(index) {
  if (index === 0) return true;

  const prevLesson = lessons[index - 1];
  const prevData = user.progress[prevLesson.id];

  return prevData && prevData.accuracy >= 70;
}

// render lessons
lessons.forEach((lesson, index) => {
  const unlocked = isUnlocked(index);

  const data = user.progress[lesson.id];
  const accuracy = data ? data.accuracy : 0;

  const lessonDiv = document.createElement("div");
  lessonDiv.className = "lesson";

  lessonDiv.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>Accuracy: ${accuracy}%</p>
    ${
      unlocked
        ? `<button onclick="startLesson('${lesson.id}')">Start</button>`
        : `<button disabled>Locked 🔒</button>`
    }
  `;

  container.appendChild(lessonDiv);
});

// start lesson
function startLesson(id) {
  window.location.href = `lesson.html?id=${id}`;
}
