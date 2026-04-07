let currentSign;

function pickRandom() {
  if (!lessons || lessons.length === 0) {
    document.getElementById("feedback").innerText = "No lessons found";
    return;
  }

  const allSigns = lessons.flatMap(l => l.signs);

  const sign = allSigns[Math.floor(Math.random() * allSigns.length)];
  currentSign = sign;

  const video = document.getElementById("video");

  if (!video) {
    console.log("Video element not found");
    return;
  }

  video.src = "";
  video.src = sign.video;
  video.load();
  // for mcq options
  showOptions(sign.name);
}
// checks users typed answer
function checkAnswer() {
  const input = document.getElementById("answer").value.toLowerCase();

  if (!currentSign) return;

  if (input === currentSign.name.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText =
      "Wrong! Correct answer: " + currentSign.name;
  }
  document.getElementById("answer").value="";
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
