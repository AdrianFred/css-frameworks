import { myPosts, names, token } from "/javascript/api/actions/functions/myposts.js";

document.getElementById("profile-name").innerHTML = `
<h3>${names}</h3>`;

if (token != null) {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "block";
} else {
  window.location.href = "../pages/login.html";
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.location.href = "../pages/login.html";
});

myPosts();
