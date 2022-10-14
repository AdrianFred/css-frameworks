const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = `https://nf-api.onrender.com/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

console.log(url);

const getPost = async () => {
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
    if (data.author.avatar == "") {
      var yellow = "/images/unknown-512.webp";
    } else {
      var yellow = data.author.avatar;
    }
    document.getElementById("post-section").innerHTML = `
        <div class="row border p-2 rounded bg-dark mt-4">
              <div class="col-xl-2 col-sm-4"><img class="img-fluid rounded" src="${yellow}" alt="Profile picture" /></div>
              <div class="col-xl-10 col-sm-8 gx-5">
                <div class="row mt-2"><h3>${data.author.name}</h3></div>
                
                <div class="row">
                  <p>
                    ${data.body}
                  </p> 
                  <div class="">
                    <p>Likes: ${data._count.reactions}</p>
                    </div>
                </div>
                
              </div>
            </div>`;
  });
};

getPost();
