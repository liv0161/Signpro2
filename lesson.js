checkSession();

const lessonId = localStorage.getItem("lesson");
const lesson = lessons.find(l => l.id === lessonId);

let index = 0;

function load() {
  const s = lesson.signs[index];

  document.getElementById("counter").innerText = "Sign" + (index+1) + "of" + lesson.signs.length;
  document.getElementById("name").innerText = s.name;
  const video = document.getElementById("name").innerText - s.name;
  if(!video){
    console.error("Video element not found");
    return;
  }
  video.src=s.video;
  video.load();
  video.play().catch(()=>{});
}

function next() {
  index++;

  if (index < lesson.signs.length) {
    load();
  } else {
    complete();
  }
}

function complete() {

  const user = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));

  if (!users[user].progress.includes(lesson.id)) {
    users[user].progress.push(lesson.id);
  }

  localStorage.setItem("users", JSON.stringify(users));

  alert("Lesson complete");
  window.location.href = "course.html";
}

load();
