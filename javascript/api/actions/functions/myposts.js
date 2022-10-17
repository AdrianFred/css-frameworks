import { searchUrl } from "/javascript/api/actions/urls/url.js";
const names = localStorage.getItem("name") || sessionStorage.getItem("name");
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

/**
 * @param {object} myPosts || sends a get method to obtain posts made by the logged in user
 */

const myPosts = async () => {
  const response = await fetch(searchUrl, {
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

export { myPosts, names, token };
