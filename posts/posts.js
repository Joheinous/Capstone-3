/* Posts Page JavaScript */

"use strict";
const loginJSON = window.localStorage.getItem("login-data");
const bearer = JSON.parse(loginJSON);

function postLoad(array) {
  console.log(array);
  let postBody = document.querySelector("#posts");

  array
    .slice()
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

      if (bearer.username == post.username) {
        let deleteButton = document.createElement("button");
        deleteButton.className = "p-2 btn btn-warning btn-sm mb-3"
        deleteButton.innerText = "Delete"
        // deleteButton.value = post._id
        deleteButton.onclick = function(){deletePost(post._id)};
        innerPostDiv2.append(deleteButton);
      };
      
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

      innerPostDiv.append(poster, postP);
      innerPostDiv2.append(likeCount, datePosted);
      outerPostDiv.append(innerPostDiv, innerPostDiv2);
      postBody.appendChild(outerPostDiv);
    });
}

function fetchPosts() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => postLoad(posts));
}

window.onload = (event) => {
  fetchPosts();
};

function post(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer.token}`,
    },
    body: JSON.stringify(data),
  };
  console.log(options);
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      window.location.assign("index.html");
      return posts;
    });
}

box.onsubmit = function (event) {
  event.preventDefault();

  const postData = {
    text: box.textArea.value,
  };

  box.postButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  post(postData);
};
logoutButton.onclick = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    logout();
}

function deletePost(value) {
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer.token}`,
        },
      };
      console.log(options);
      fetch(apiBaseURL + `/api/posts/${value}`, options)
        .then((response) => response.json())
        .then((posts) => {
          window.location.assign("index.html");
          return posts;
        });
}



