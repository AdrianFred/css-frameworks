const names = localStorage.getItem("name") || sessionStorage.getItem("name");
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const url = "https://nf-api.onrender.com/api/v1/social/posts?limit=5000&_author=true";

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

const myPosts = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const test = response.json();
  test.then((data) => {
    data.forEach((post) => {
      if (post.author.name == names) {
        console.log(post);
        document.getElementById("recents").innerHTML += `
          
        <form action="../pages/specific.html" method="GET">
            <div class="col-xl-6 offset-xl-3 mt-4 bg-dark rounded p-2">
                <div class=""><h3>@${post.author.name}</h3></div>
                <div class="">
                    <p> ${post.body}</p>
                </div>  
                <input type="hidden" name="id" value="${post.id}">
                <input type="submit" value="View Post" class="btn btn-primary">     
            </div>
        </form>`;
      }
    });
  });
};

myPosts();
