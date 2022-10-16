const baseUrl = "https://nf-api.onrender.com/api/v1/social/";
const postUrl = baseUrl + "posts";
const authUrl = baseUrl + "auth/";
const loginUrl = authUrl + "login";
const registerUrl = authUrl + "register";
const searchUrl = baseUrl + "posts?_author=true&limit=5000";

export { baseUrl, postUrl, authUrl, loginUrl, registerUrl, searchUrl };
