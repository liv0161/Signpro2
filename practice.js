let currentSign;
let currentLesson;
function pickRandom() {
  const lesson = lessons[Math.floor(Math.random()*lessons.length)];
  currentLesson = lesson;
  const sign = lesson.signs[Math.floor(Math.random()* lesson.signs.length)];
  currentSign = sign;
  document.getElementById("video").src = sign.video
}
function checkAnswer(){
  const input=document.getElementById("answer").value.toLowerCase();
  const correct = currentSign.name.toLowerCase();
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[localStorage.getItem("currentUser")];
  if (!user.progress) user.progress = {};
  if (!user.progress[currentLesson.id]){
    user.progress[currentLesson.id] = {
      correct: 0,
      total: 0,
      accuracy: 0
    };
  }
  const lessonData = user.progress[currentLesson.id];
  lessonData.total++;
  if (input ===correct){
    lessonData.correct++;
    document.getElementById("feedback").innerText = "Correct!;
  } else{
    document.getElementById("feedback").innerText = "Incorrect! Correct answer: " + currentSign.name;
  }

lessonData.accuracy = Math.round((lessonData.correct/ lessonData.total) * 100);
localStorage.setItem("users", JSON.stringify(users));

document.getElementById("answer").value = "";
pickRandom();
}
pickRandom();
