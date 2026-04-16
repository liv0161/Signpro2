window.onload = () => {

  const progress = JSON.parse(localStorage.getItem("progress")) || { signs: {} };
  const lastTest = JSON.parse(localStorage.getItem("lastTest"));

  console.log("PROGRESS DATA:", progress);

  const testSummary = document.getElementById("testSummary");
  const strongList = document.getElementById("strongList");
  const weakList = document.getElementById("weakList");
  const recommendList = document.getElementById("recommendList");

  // test summary
  if (lastTest) {
    testSummary.textContent =
      `Score: ${lastTest.score}/${lastTest.total} (${lastTest.accuracy}%)`;
  } else {
    testSummary.textContent = "No test taken yet.";
  }

  let strong = [];
  let weak = [];

  // sign classification
  for (let sign in progress.signs) {
    let data = progress.signs[sign];

    let attempts = data.attempts || (data.correct + (data.wrong || 0));
    let correct = data.correct || 0;

    if (!attempts) continue;

    let accuracy = correct / attempts;

    if (accuracy >= 0.7) {
      strong.push(sign);
    } else {
      weak.push(sign);
    }
  }

  // strong signs
  strongList.innerHTML = "";
  if (strong.length === 0) {
    strongList.innerHTML = "<li>No strong signs yet</li>";
  } else {
    strong.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      strongList.appendChild(li);
    });
  }

  // weak signs
  weakList.innerHTML = "";
  if (weak.length === 0) {
    weakList.innerHTML = "<li>No weak signs yet</li>";
  } else {
    weak.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      weakList.appendChild(li);
    });
  }

  // recommended lessons
  recommendList.innerHTML = "";

  lessons.forEach(lesson => {
    let hasWeak = lesson.signs.some(sign => weak.includes(sign.name));

    if (hasWeak) {
      const li = document.createElement("li");
      li.textContent = lesson.title;
      recommendList.appendChild(li);
    }
  });

};
