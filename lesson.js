const video = document.getElementById("video");
const label = document.getElementById("label");

const params = new URLSearchParams(window.location.search);
const lessonId = params.get("id");

console.log("Lesson ID from URL:", lessonId);

// find lesson
let lesson = lessons.find(l => l.id === lessonId);

// fallback
if (!lesson) {
  console.log("Lesson not found, defaulting to lesson1");
  lesson = lessons[0];
}

let index = 0;

function loadSign() {
  const sign = lesson.signs[index];

  video.src = sign.video;
  label.textContent = sign.name;
}

function nextSign() {
  index++;
  if (index >= lesson.signs.length) index = 0;
  loadSign();
}

// start
loadSign();
