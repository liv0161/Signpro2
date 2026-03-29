
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


async function hash(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}


function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validPassword(password) {
  return password.length >= 8 &&
         /\d/.test(password) &&
         /[A-Z]/.test(password);
}


async function register() {

  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!validEmail(email)) return alert("Invalid email");
  if (!validPassword(password)) return alert("Weak password");

  const users = getUsers();

  if (users[email]) return alert("User exists");

  users[email] = {
    password: await hash(password),
    attempts: 0,
    locked: false,
    progress: {},
    signStats:{},
    created: new Date().toISOString()
  };

  saveUsers(users);
  alert("Account created");
}


async function login() {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = getUsers();

  if (!users[email]) return alert("No account");

  if (users[email].locked)
    return alert("Account locked");

  const hashed = await hash(password);

  if (hashed !== users[email].password) {

    users[email].attempts++;

    if (users[email].attempts >= 3) {
      users[email].locked = true;
    }

    saveUsers(users);
    return alert("Wrong password");
  }

  users[email].attempts = 0;
  saveUsers(users);

  localStorage.setItem("currentUser", email);

  window.location.href = "course.html";
}
