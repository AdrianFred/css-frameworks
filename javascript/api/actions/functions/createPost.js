import { postUrl } from "../urls/url.js";

const createPost = async (data) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  response.json().then((data) => {
    console.log(data);
  });
};

document.getElementById("submitpost").addEventListener("submit", function (e) {
  // e.preventDefault();
  createPost({
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
  });
});
