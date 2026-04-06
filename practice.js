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

  document.getElementById("answer").value = "";

  pickRandom();
}
// loads page first
window.onload = pickRandom;
