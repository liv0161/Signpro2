document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("course");

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const current = localStorage.getItem("currentUser");

  const user = users[current];

  // 🔥 SAFETY FIXES
  if (!user) {
    container.innerText = "No user logged in";
    return;
  }

  if (!user.progress) {
    user.progress = {};
  }

  function unlocked(i) {
    if (i === 0) return true;

    const prev = lessons[i - 1];
    const data = user.progress[prev.id];

    return data && data.accuracy >= 70;
  }

  lessons.forEach((l, i) => {
    container.innerHTML += `
      <div>
        <h3>${l.title}</h3>
        <button onclick="startLesson('${l.id}')"
          ${!unlocked(i) ? "disabled" : ""}>
          ${unlocked(i) ? "Start" : "Locked"}
        </button>
      </div>
    `;
  });

});

function startLesson(id) {
  localStorage.setItem("lesson", id);
  window.location.href = "lesson.html";
}
