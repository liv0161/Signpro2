const video = document.getElementById("video");
const label = document.getElementById("label");
const title = document.getElementById("lessonTitle");

const params = new URLSearchParams(window.location.search);
const lessonId = params.get("id");

console.log("Lesson ID:", lessonId);

// find lesson
let lesson = lessons.find(l => l.id === lessonId);

// fallback if broken
if (!lesson) {
  lesson = lessons[0];
}

title.textContent = lesson.title;

let index = 0;

function loadSign() {
  const sign = lesson.signs[index];

  video.src = sign.video;
  label.textContent = sign.name;
}

function nextSign() {
  index++;
  //end of lesson
  if (index >= lesson.signs.length) {
    alert("Lesson complete!");
    // go back to course page
    window.location.href = "course.html";
    return;
  }

  loadSign();
}
function goBack() {
  window.location.href = "course.html";
}

// start
loadSign();
