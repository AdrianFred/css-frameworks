const url = "https://nf-api.onrender.com/api/v1/social/auth/register";

const register = async (data) => {
  const response = await fetch(url, {
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
