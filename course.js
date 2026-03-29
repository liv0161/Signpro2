checkSession();

const userEmail = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));
const progress = users[userEmail].progress;

const container = document.getElementById("course");

function isUnlocked(index){
  if (index===0) return true;
  const prev = lessons[index-1];
  const data = progress[prev.id];
  if(!data) return false;
  return data.ccuracy>=70;
}
lessons.forEach((lesson, i) => {

  const unlocked = isUnlocked(i);

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
