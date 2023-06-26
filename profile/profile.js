"use strict";


const loginData = getLoginData();
console.log(loginData);

logoutButton.onclick = function (event) {
  event.preventDefault();

  logout();
};

function welcomeUser() {
  let paraBody = document.querySelector("h2");
  let para1 = document.createElement("p");

  para1.innerText = `Welcome ${loginData.username}`;
  paraBody.appendChild(para1);
}

function fetchPosts() {
  const options = {
    method: "GET",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/posts?username=${loginData.username}`, options)
    .then((response) => response.json())
    .then((posts) => loadPosts(posts || []));
}

function loadPosts(array) {
  console.log(array);
  let postBody = document.querySelector("#posts");

  array
    // .slice()  < craig says it doesnt do anything atm
    .reverse()
    .forEach((post) => {
      let outerPostDiv = document.createElement("div");
      outerPostDiv.className = "container roundedPost bg-light";
      let innerPostDiv = document.createElement("div");
      innerPostDiv.className = "d-flex flex-row";
      let postP = document.createElement("h5");
      postP.className = "p-2";
      let poster = document.createElement("h4");
      poster.className = "p-2";
      let innerPostDiv2 = document.createElement("div");
      innerPostDiv2.className = "d-flex flex-row-reverse";
      let likeCount = document.createElement("p");
      likeCount.className = "p-2 text-body-secondary";
      let datePosted = document.createElement("p");
      datePosted.className = "p-2 text-body-secondary";

      let dateOfPost = new Date(post.createdAt).toLocaleString("en-US", {
        hour12: true,
      });

      postP.innerText = post.text;
      poster.innerText = post.username;
      likeCount.innerText = "Likes: " + post.likes.length;
      datePosted.innerText = dateOfPost;

      // (post.date.getMonth() + 1) + "/" + post.date.getDay() + "/" + post.date.getFullYear()

      innerPostDiv.append(poster, postP);
      innerPostDiv2.append(likeCount, datePosted);
      outerPostDiv.append(innerPostDiv, innerPostDiv2);
      postBody.appendChild(outerPostDiv);
    });
}

function createPost() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((post) => loadPosts(post));
}
window.onload = (event) => {
  fetchPosts();
  welcomeUser();
};
