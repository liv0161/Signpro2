checkSession();

const user = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));

const progress = users[user].progress;

const container = document.getElementById("course");

lessons.forEach((lesson, i) => {

  const unlocked = i === 0 || progress.includes(lessons[i-1].id);

  container.innerHTML += `
    <div>
      <h3>${lesson.title}</h3>
      <button ${!unlocked ? "disabled" : ""}
        onclick="start('${lesson.id}')">
        ${unlocked ? "Start" : "Locked"}
      </button>
    </div>
  `;
});

function start(id) {
  localStorage.setItem("lesson", id);
  window.location.href = "lesson.html";
}
