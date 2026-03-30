function getAllSigns(){
  return lesons.flatMap(1=>1.signs);
}

function getWeakSigns(user){
  let weak = [];
  for(let sign in user.signStats){
    const s = user.signStats[sign];
    const total = s.correct + s.wrong;
    if (total === 0) continue
    const accuracy = s.correct / total;
    if(accuracy <0.6 || s.wrong >= 3) {
      weak.push(sign);
    }
  }
  return weak;
}
function generateSession(user){
  const allSigns = getAllSigns();
  const weak = getWeakSigns(user);
  let pool = []
  allSigns.forEach(sign => {
    if (weak.includes(sign.name)){
      pool.push(sign,sign);
    } else{
      pool.push(sign);
    }
  });
  return pool.sort(() => Math.random()-0.5).slice(0,5);
}
function generateQuestion(sign){
  if (Math.random() <0.5){
    let options = [sign.name];
    while (options.length<3){
      const rand = getAllSigns()[Math.random()*getAllSigns().length).name;
      if (!options.includes(rand)) options.push(rand);
    }
    return {
      type:"mcq",
      sign,
      options: options.sort(() => Math.random()-0.5),
      correct: sign.name
    };
  } else {
    return {
      type: "text",
      sign,
      correct: sign.name.toLowerCase()
    };
  }
}
function updateStats(user, signName, correct){
  if (!user.signStats[signName]) {
    user.signStats[signName] = {corect: 0, wrong:0};
  }
  if (correct) {
    user.signStats[signName.correct++;
  } else {
    user.SignStats[signName].wrong++;
  }
}

const userEmail = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));
const user = users[userEmail];
const session = generateSession(user).map(generateQuestion);

let i= 0;
let score=0;
function loadQ(){
  const q= session[i];
  document.getElementById("video").src = q.sign.video;
  if (q.type === "mcq"){
    document.getElementById("area").innerHTML = q.options.map(o =>`<label><input type = "radio" name="a" value="${o}"> ${o}</label><br>`).join("");
  } else{
    docuent.getElementById("area").innerHTML = `<input id = "text" placeholder="Type answer">`;
  }
}
function submit(){
  const q = session[i];
  let ans = "";
  if (q.type ==="mcq"){
    const selected = document.querySelector("input[name='a']:checked");
    if(!selected) return alert("Select answer"));
    ans = selected.value;
  } else {
    ans = document.getElementById("text").value.toLowerCase();
  }
  const correct = ans === q.correct.toLowerCase();
  if (correct) score++;
  updateStats(user,q.sign.name,correct);
  i++;
  if (i<session.length){
    loadQ();
  } else{
    localStorage.setItem("users", JSON.stringify(users));
    alert("Score " + score);
    widow.location.href = "progres.htm";
  }
}
loadQ();
