const container = document.getElementById("lessons");

if (!container) {
  console.error("No lessons container found");
}

if (typeof lessons === "undefined") {
  console.error("Lessons not loaded");
}
// load progress
let progress = JSON.parse(localStorage.getItem("progress")) || {
  signs: {},
  lessonsUnlocked: ["lesson1"]
};

function renderLessons() {
  container.innerHTML = "";

  lessons.forEach(lesson => {
    const unlocked = progress.lessonsUnlocked.includes(lesson.id);

    // lesson progress
    let total = lesson.signs.length;
    let correct = 0;

    lesson.signs.forEach(sign => {
      const data = progress.signs[sign.name];
      if (data && data.correct > 0) {
        correct++;
      }
    });

    const percent = Math.round((correct / total) * 100);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${lesson.title}</h3>

      <div style="background:#ddd;height:10px;border-radius:5px;">
        <div style="
          width:${percent}%;
          height:10px;
          background:#4CAF50;
          border-radius:5px;
        "></div>
      </div>

      <p>${percent}% complete</p>

      <button ${!unlocked ? "disabled" : ""} onclick="startLesson('${lesson.id}')">
        ${unlocked ? "Start Lesson" : "Locked"}
      </button>
    `;

    container.appendChild(div);
  });
}

function startLesson(id) {
  window.location.href = `lesson.html?id=${id}`;
}

window.onload = renderLessons;
