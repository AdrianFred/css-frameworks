const url = "https://nf-api.onrender.com/api/v1/social/auth/login";

const login = async (data) => {
  const response = await fetch(url, {
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
      } else {
        sessionStorage.setItem("token", data.accessToken);
      }
      window.location.href = "/profile.html";
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
