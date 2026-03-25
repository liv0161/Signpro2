function checkSession() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
