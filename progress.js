checkSession();

const user = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));

document.getElementById("progress").innerText =
  "Lessons completed: " + users[user].progress.length;
