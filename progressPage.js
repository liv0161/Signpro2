document.getElementById("accuracy").innerHTML =
  `<h2>Overall Accuracy: ${getAccuracy()}%</h2>`;

// strong signs
const strong = getStrongSigns();
const weak = getWeakSigns();

function renderList(id, arr) {
  const el = document.getElementById(id);
  el.innerHTML = "";

  if (arr.length === 0) {
    el.innerHTML = "<li>None yet</li>";
    return;
  }

  arr.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

renderList("strong", strong);
renderList("weak", weak);

// suggested lessons
const suggested = getSuggestedLessons();
renderList("suggested", suggested);
