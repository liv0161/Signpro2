const lesson = lessons[0];

let i = 0;

function load() {
  const sign = lesson.signs[i];

  document.getElementById("lessonTitle").innerText = lesson.title;
  document.getElementById("counter").innerText = (i + 1) + "/" + lesson.signs.length;
  document.getElementById("name").innerText = sign.name;

  document.getElementById("video").src = sign.video;
}

function next() {
  i++;

  if (i < lesson.signs.length) {
    load();
  } else {
    alert("Finished!");
  }
}

load();
