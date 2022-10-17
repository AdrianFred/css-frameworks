const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

console.log(url);

const getPost = async () => {
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
    if (data.author.avatar == "") {
      var image = "/images/unknown-512.webp";
    } else {
      var image = data.author.avatar;
    }
    document.getElementById("post-section").innerHTML = `
        <div class="row border p-2 rounded bg-dark mt-4">
              <div class="col-xl-2 col-sm-4"><img class="img-fluid rounded" src="${image}" alt="Profile picture" /></div>
              <div class="col-xl-10 col-sm-8 gx-5">
                <div class="row mt-2"><h3>@${data.author.name}</h3></div>
                <div class="row mt-2"><h4>${data.title}</h4></div>
                <div class="row">
                  <p>${data.body}</p> 
                  <div class="">
                    <p>Likes: ${data._count.reactions}</p>
                    <button class="btn btn-primary" id="like">Like</button>
                    <button class="btn btn-primary" id="edit">Edit Post</button>
                    <button class="btn btn-primary" id="delete">Delete</button>
                    </div>
                </div>
                
              </div>
            </div>`;
    document.getElementById("edit").addEventListener("click", () => {
      document.getElementById("post-section").innerHTML = `
      <form action="" id="submitpost">
        <div class="mb-3">
          <div class="">
            <div>
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" value="${data.title}"/>
            </div>
          </div>
            <label for="body" class="form-label">Submit a new post</label>
            <textarea class="form-control" id="body" rows="5" required >${data.body}</textarea>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary" type="submit">Confirm</button>
          </div>
      </form>`;
      document.getElementById("submitpost").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;
        const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}`;
        const data = {
          title: title,
          body: body,
        };
        const response = fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        response.then((data) => {
          if (data.status == 200) {
            window.location.href = "../pages/profile.html";
          }
        });
      });
    });
    document.getElementById("delete").addEventListener("click", () => {
      deletePost();
    });
  });
};

getPost();

const deletePost = async () => {
  const response = await fetch(`https://nf-api.onrender.com/api/v1/social/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const test = response.json();
  test.then((data) => {
    console.log(data);
    window.location.href = "../index.html";
  });
};
