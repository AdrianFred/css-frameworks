import { registerUrl } from "../actions/urls/url.js";

const register = async (data) => {
  const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  register({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  });
});
