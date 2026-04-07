let currentSign;
let currentLessonId;
// check for unlocked lessons
function isUnlocked(index,user){
  if(index===0) return true;
  const prevLesson = lessons[index-1];
  const prevData = user.progress?.[prevLesson.id];
  return prevData&&prevData.accuracy>=70;
}
// pick rndom signs from unlcoked lessons
function pickRandom() {
  const users=JSON.parse(localStorage.getItem("users"))|| {};
  const currentUsername = localStorage.getItem("currentUser");
  if (!currentUsename || !users[currentUsername]) {
    document.getElementById("feedback").innerText = "No user found";
    return;
  }
  const user = users[currentUsername];
  if (!user.progress) user.progress={};
  // always have lesson 1
  const unlockedLessons = lessons.filter((l,i) =>{
    if (i===0) return true;
    const prevLesson = lessons[i-1];
    const prevData = user.progress[prevLesson.id];
    return prevData &&prevData.accuracy>= 70;
  });
    // dont let practice be empty
  if (unlockedLessons.length===0){
    unlockedLessons.push(lessons[0]);
  }
  // pick random lesson
  const lesson = 
    unlockedLessons[Math.floor(Math.random()* unlockedLessons.length)];
  currentLessonId= lesson.id;
// pic random ign from tha lesson
  const sign = 
    lesson.signs[Math.floor(Math.random()* lesson.signs.length)];
  currentSign = sign;
  const video = document.getElementById("video");
  video.pause();
  video.removeAttribute("src");
  video.load();
  video.src = sign.video;
  video.load();
  showOptions(sign.name);
}
// checks users typed answer
function checkAnswer() {
  const input = document.getElementById("answer").value.toLowerCase();
}
// mcq answers
function selectOption(choice){
  const correct = choice === currentSign.name;
  updateProgress(correct);
}
// update progress
function updateProgress(isCorrect){
  const users=JSON.parse(localStorage.getItem("users"))||{};
  const user = users[localStorage.getItem("currentUser")];
  if(!user.progress) user.progress={};
  if(!user.progress[currentLessonId]){
    user.progress[currentLessonId] = {
      correct: 0,
      total: 0,
      accuracy:0
    };
  }
  const data = user.progress[currentLessonId];
  data.total++;
  if (isCorrect{
    data.correct++;
    document.getElementById("feedbck").innerText"Correct!";
  } else {
    document.getElementById("feedback").innerText =
      "Wrong! Correct answer: " + currentSign.name;
  }
  data.accuracy = Math.round((data.correct / data.total) *100);
  localStorage.setItem("users", JSON.stringify(users));
}

// changes displayed sign
function nextSign() {
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  pickRandom();
}
// for multiple choice questions
function showOptions(correctAnswer) {
  const allSigns = lessons.flatMap(l => l.signs);
  const options = [correctAnswer];
  // makes 3 random incorrect answers
  while (options.length < 4) {
    const random = allSigns[Math.floor(Math.random() * allSigns.length)].name;
    if (!options.includes(random)) {
      options.push(random);
    }
  }
// shuffle options
  options.sort(() => Math.random() - 0.5);

  const container = document.getElementById("options");
  container.innerHTML = "";

  options.forEach(opt => {
    container.innerHTML += `
      <button onclick="selectOption('${opt}')">${opt}</button>
    `;
  });
}
// multiple choice selection 
function selectOption(choice) {
  if (choice === currentSign.name) {
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText =
      "Wrong! Correct answer: " + currentSign.name;
  }

  setTimeout(() => {
    nextSign();
  }, 1000);
}
// loads first sign
window.onload = pickRandom;
