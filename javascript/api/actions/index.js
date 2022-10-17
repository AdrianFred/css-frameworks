import searchPost from "/javascript/api/actions/functions/searchpost.js";
import getPosts from "/javascript/api/actions/functions/getPosts.js";

const url2 = "https://nf-api.onrender.com/api/v1/social/posts?_author=true";
const yourName = localStorage.getItem("name") || sessionStorage.getItem("name");

if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
  getPosts();
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

document.getElementById("search").addEventListener("click", function (e) {
  e.preventDefault();
  searchPost(document.getElementById("searchbar").value);
});
