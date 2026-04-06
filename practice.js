let currentSign;

function pickRandom() {
  if (!lessons || lessons.length === 0) {
    document.getElementById("feedback").innerText = "No lessons found";
    return;
  showOptions(sign.name);
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
}

function checkAnswer() {
  const input = document.getElementById("answer").value.toLowerCase();

  if (!currentSign) return;

  if (input === currentSign.name.toLowerCase()) {
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText =
      "Wrong! Correct answer: " + currentSign.name;
  }
function nextSign() {
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  pickRandom();
}
function showOptions(correctAnswer) {
  const allSigns = lessons.flatMap(l => l.signs);
  const options = [correctAnswer];

  while (options.length < 4) {
    const random = allSigns[Math.floor(Math.random() * allSigns.length)].name;
    if (!options.includes(random)) {
      options.push(random);
    }
  }

  options.sort(() => Math.random() - 0.5);

  const container = document.getElementById("options");
  container.innerHTML = "";

  options.forEach(opt => {
    container.innerHTML += `
      <button onclick="selectOption('${opt}')">${opt}</button>
    `;
  });
}
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

  document.getElementById("answer").value = "";

  pickRandom();
}
// loads page first
window.onload = pickRandom;
