const url2 = "https://nf-api.onrender.com/api/v1/social/posts?_author=true&limit=5000";

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

export default searchPost;
