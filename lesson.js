checkSession();

const lessonId = localStorage.getItem("lesson");
const lesson = lessons.find(l => l.id === lessonId);

let index = 0;
let correct = 0;
document.getElementById("lessonTitle").innerText = lesson.title;

function load() {
  const s = lesson.signs[index];

  document.getElementById("counter").innerText = `Sign ${index+1} of ${lesson.signs.length}`;
  document.getElementById("name").innerText = s.name;
  document.getElementById("video").src = s.video;
  }

function next() {
  correct++;
  index++;

  if (index < lesson.signs.length) {
    load();
  } else {
    complete();
  }
}

function complete() {
  const userEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users[userEmail];

  const total = lesson.signs.length;
  const accuracy = Math.round(correct/total)*100)

  user.progress[lesson.id] = {
    completed: true,
    score: correct,
    attempts: (user.progress[lesson.id]?.attempts || 0)+1,
    astPractised: new Dat().toISOString(),
    signsCorrect correct,
    signsWrong: total - correct,
    accuracy
  };

  localStorage.setItem("users", JSON.stringify(users));
  alert("Lesson complete:"+ accuracy+"%");
  window.location.href = "course.html";
}

load();
