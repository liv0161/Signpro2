const lessonsContainer = document.getElementById("lessons");

// debug
console.log("LESSONS:", lessons);

if (!lessons || lessons.length === 0) {
  lessonsContainer.innerHTML = "<p>No lessons found.</p>";
} else {

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUser = localStorage.getItem("currentUser") || "testUser";

  if (!users[currentUser]) {
    users[currentUser] = { progress: {} };
  }

  const user = users[currentUser];

  function isUnlocked(index) {
    if (index === 0) return true;

    const prev = user.progress[lessons[index - 1].id];
    return prev && prev.score >= 70;
  }

  lessons.forEach((lesson, index) => {
    const div = document.createElement("div");

    const unlocked = isUnlocked(index);
    const score = user.progress[lesson.id]?.score ?? 0;

    div.innerHTML = `
      <h3>${lesson.title}</h3>
      <p>Score: ${score}%</p>
      <button ${!unlocked ? "disabled" : ""}>
        ${unlocked ? "Start" : "Locked"}
      </button>
    `;

    lessonsContainer.appendChild(div);
  });
}
alert(lessons.length);
