checkSession();

const questions = [
  {
    type: "mcq",
    embed: lessons[0].signs[0].embed,
    correct: "Hello",
    options: ["Hello", "Goodbye", "Thank You"]
  },
  {
    type: "text",
    embed: lessons[1].signs[0].embed,
    correct: "thank you"
  }
];

let i = 0;
let score = 0;

function loadQ() {

  const q = questions[i];

  const vid = document.getElementById("video");
  vid.src = q.video
  vid.load();
  vid.play();

  if (q.type === "mcq") {

    document.getElementById("area").innerHTML =
      q.options.map(o =>
        `<input type="radio" name="a" value="${o}">${o}<br>`
      ).join("");

  } else {

    document.getElementById("area").innerHTML =
      `<input id="text">`;
  }
}

function submit() {

  const q = questions[i];
  let ans = "";

  if (q.type === "mcq") {
    const s = document.querySelector("input[name='a']:checked");
    if (!s) return alert("Select an answer");
    ans = s.value;
  } else {
    ans = document.getElementById("text").value.toLowerCase();
  }

  if (ans === q.correct.toLowerCase()) score++;

  i++;

  if (i < questions.length) {
    loadQ();
  } else {
    alert("Score: " + score);
    window.location.href = "progress.html";
  }
}

loadQ();
