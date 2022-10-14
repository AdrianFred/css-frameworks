const names = localStorage.getItem("name") || sessionStorage.getItem("name");

document.getElementById("profile-name").innerHTML = `
<h3>${names}</h3>`;
