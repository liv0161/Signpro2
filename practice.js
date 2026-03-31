const user = JSON.parse(localStorage.getItem("users"))[ 
  localStorage.getItem("currentUser")
  ];
const allSigns = lessons.flatMap(1=>1.signs);
function weakSigns(){
  return Object.keys(user.signStats || {}).filter(s=>{
    const stat = user.signStats[s];
    return stat.wrong>=3 || (stat.correct /(stat.correct + stat.wrong)) < 0.6;
  });
}
function generate(){
  const weak = weakSigns();
  let pool= [];
  allSigns.forEach(s=>{
    if (weak.include(s.name)){
      pool.push(s, s);
    } else{
      pool.push(s);
    }
  if (s.difficulty ===2) pool.push (s);
  })';
    return pool[Math.floor(Math.random()* pool.length)];
}
const sign = generate();
video.src = sign.video;
area.innerHTML = `<input id="ans" placeholder=""Type answer">`;
function submit(){
  const ans=document.getElementById("ans").value.toLowerCase();
  if (!user.signStats[sign.name]={correct:0,wrong:0};
}
if (ans === sign.name.toLowerCase()){
  user.signStats[sign.name].correct++;
  alert("Correct");
} else{
  user.signStats[sign.name]wrong++;
  alert("Incorrect");
}
const users = JSON.parse(localStorage.getItem("users"));
users[localStorage.getItem("currentUser")] = user;
localStorage.setItem("users",JSON.stringify(users));
location.reload();
}
