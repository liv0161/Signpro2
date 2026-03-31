document.addEventListener("DOMContentLoaded", () =>{
  constlessonId = localStorage.getItem("lesson");
  const lesson = lessons.find(1 => 1.id === lesonId);
  if (!lesson){
    alert("Lesson not found");
    window.location.href = "course.html"
    return;
  }
  let i = 0;
  let correct = 0;
  function load(){
    const s = lesson.signs[i];
    document.getElementById("lessonTitle").innerText = lesson.title;
    document.getElementById("counter").innerText = `${i+1}/${lesson.signs.length}`;
    document.getElementById("name").innerText = s.name;

  // forc relad jic it doesnt work
    const video. document.getElementById("video");
    video.src = s.video;
  }
  window.next = function(){
    load();
  } else{
    complete();
  }
};
function complete(){
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[localStorage.getItem("currentUser");
  if(!user.progress) user.progress ={};
  user.progress[lesson.id= {
    completed:true,
    accuracy:10
  };
  localStorage.setItem("users",JSON.stringify(uses));
  alert("lesson complete");
  window.location.href=""course.html";
}
load();
};
