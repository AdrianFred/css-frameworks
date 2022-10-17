let params = "limit=10&_author=true";
let url = `https://nf-api.onrender.com/api/v1/social/posts?${params}`;

/**
 * @param {object} getPosts - The function that gets the posts.
 */

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

/**
 * @param {string} filter // filter posts by the options "newest", "oldest", "A-Z", "Z-A"
 */

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
  url = `https://nf-api.onrender.com/api/v1/social/posts?${params}`;
  getPosts();
}
