let params = "limit=10&_author=true";
let url = `https://nf-api.onrender.com/api/v1/social/posts?${params}`;
const url2 = "https://nf-api.onrender.com/api/v1/social/posts?_author=true";
const yourName = localStorage.getItem("name") || sessionStorage.getItem("name");

const getPosts = async () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const test = response.json();
  test.then((data) => {
    console.log(data);
    document.getElementById("post-section").innerHTML = "";
    data.forEach((post) => {
      if (post.author.avatar == "") {
        var image = "/images/unknown-512.webp";
      } else {
        var image = post.author.avatar;
      }
      document.getElementById("post-section").innerHTML += `
      <form action="../pages/specific.html" method="GET">
            <div class="row border p-2 rounded bg-dark mt-4">
              <div class="col-xl-2 col-sm-4"><img class="img-fluid rounded" src="${image}" alt="Profile picture" /></div>
              <div class="col-xl-10 col-sm-8 gx-5">
                <div class="row mt-2"><h3 id=name>${post.author.name}</h3></div>
                <div class="row"><h4>${post.title}</h4></div>
                <div class="row">
                  <p>
                    ${post.body}
                  </p>
                </div>
                <input type="hidden" name="id" value="${post.id}">
                <input type="submit" value="View Post" class="btn btn-primary">
              </div>
            </div>
        </form>`;
    });
  });
};

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

function filterPosts(filter) {
  params = "limit=10&_author=true";
  switch (filter) {
    case "newest":
      params += "&sort=created&sortOrder=desc";
      break;
    case "oldest":
      params += "&sort=created&sortOrder=asc";
      break;
    case "A-Z":
      params += "&sort=title&sortOrder=asc";
      break;
    case "Z-A":
      params += "&sort=title&sortOrder=desc";
      break;
  }
  console.log(params);
  url = `https://nf-api.onrender.com/api/v1/social/posts?${params}`;
  getPosts();
}

document.getElementById("search").addEventListener("click", function (e) {
  e.preventDefault();
  searchPost(document.getElementById("searchbar").value);
});

const searchPost = async (Word) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(url2, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const test = response.json();
  test.then((data) => {
    document.getElementById("post-section").innerHTML = "";
    data.forEach((post) => {
      if (post.author.avatar == "") {
        var yellow = "/images/unknown-512.webp";
      } else {
        var yellow = post.author.avatar;
      }
      if (post.body.includes(Word)) {
        document.getElementById("post-section").innerHTML += `
        <form action="../pages/specific.html" method="GET">
            <div class="row border p-2 rounded bg-dark mt-4">
                <div class="col-xl-2 col-sm-4"><img class="img-fluid rounded" src="${yellow}" alt="Profile picture" /></div>
                <div class="col-xl-10 col-sm-8 gx-5">
                    <div class="row mt-2"><h3>${post.author.name}</h3></div>
                    <div class="row">
                        <p>
                        ${post.body}
                        </p>
                    </div>
                    <input type="hidden" name="id" value="${post.id}">
                    <input type="submit" value="View Post" class="btn btn-primary">
                </div>
            </div>
        </form>`;
      }
    });
  });
};
