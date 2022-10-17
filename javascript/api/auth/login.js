import { loginUrl } from "../actions/urls/url.js";

const login = async (data) => {
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const test = response.json();
  test.then((data) => {
    if (data.accessToken != null) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (document.getElementById("check").checked) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("avatar", data.avatar);
      } else {
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("avatar", data.avatar);
      }
      window.location.href = "../pages/profile.html";
    } else {
      alert("Invalid Credentials");
    }
  });
};

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  login({
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  });
});
