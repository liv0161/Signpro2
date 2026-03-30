checkSession();

const userEmail = localStorage.getItem("currentUser");
const users = JSON.parse(localStorage.getItem("users"));
const user = users[userEmail]

document.getElementById("progress").innerText =
  JSON.stringify(user.progress,null,2)
