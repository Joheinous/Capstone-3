"use strict";

const usernameInput = document.querySelector("#username-input");
const fullNameInput = document.querySelector("#full-name-input");
const aboutInput = document.querySelector("#about-input");
const loginData = getLoginData();

logoutButton.onclick = function (event) {
  event.preventDefault();

  logout();
};

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function dropDownUser() {
  let paraBody = document.querySelector("#dropbtn");
  paraBody.innerText = `${loginData.username}`;
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

      if (loginData.username == post.username) {
        let deleteButton = document.createElement("button");
        deleteButton.className = "p-2 btn btn-warning btn-sm mb-3";
        deleteButton.innerText = "Delete";
        // deleteButton.value = post._id
        deleteButton.onclick = function () {
          deletePost(post._id);
        };
        innerPostDiv2.append(deleteButton);
      }

      let dateOfPost = new Date(post.createdAt).toLocaleString("en-US", {
        hour12: true,
      });

      postP.innerText = post.text;
      poster.innerText = post.username;

      let linkedPoster = document.createElement("a");

      linkedPoster.href = `/profile/index.html?username=${loginData.username}`;
      linkedPoster.appendChild(poster);

      if (post.likes.find((likes) => likes.username === loginData.username)) {
        likeCount.className = "p-2 btn btn-danger btn-sm mb-3 me-2";
        let postLikeId = post.likes
          .filter((object) => object.username === loginData.username)
          .map((object) => object._id);
        likeCount.onclick = function () {
          deleteLike(postLikeId);
        };
        console.log(postLikeId);
      } else {
        likeCount.className = "p-2 btn btn-secondary btn-sm mb-3 me-2";
        likeCount.onclick = function () {
          likePost(post._id);
        };
      }

      likeCount.innerText = "Likes: " + post.likes.length;
      datePosted.innerText = dateOfPost;

      innerPostDiv.append(linkedPoster, postP);
      innerPostDiv2.append(likeCount, datePosted);
      outerPostDiv.append(innerPostDiv, innerPostDiv2);
      postBody.appendChild(outerPostDiv);
    });
}

function post(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(data),
  };
  console.log(options);
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      window.location.assign("/profile/index.html");
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

function likePost(likeId) {
  console.log(likeId);
  let obj = { postId: likeId };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(obj),
  };
  console.log(options);
  fetch(apiBaseURL + "/api/likes", options)
    .then((response) => response.json())
    .then((posts) => {
      window.location.assign("/profile/index.html");
      return posts;
    });
}

function deleteLike(likeId) {
  console.log(likeId);

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/likes/${likeId}`, options)
    .then((response) => response.json())
    .then((posts) => {
      window.location.assign("/profile/index.html");
      return posts;
    });
}

function deletePost(value) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/posts/${value}`, options)
    .then((response) => response.json())
    .then((posts) => {
      window.location.assign("/profile/index.html");
      return posts;
    });
}

function profileBuilder(user) {
  console.log(user);
  let outputDiv = document.querySelector("#profile");
  let profilePic = document.createElement("img");
  profilePic.src = `https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png`;
  profilePic.className = "profilePic";
  let username = document.createElement("h2");
  username.className = "bg-dark mr-auto";
  username.innerText = user.username;
  let fullname = document.createElement("h3");
  fullname.innerText = user.fullName;
  let about = document.createElement("h5");
  about.innertext = user.about;
  let joinDate = document.createElement("h5");
  joinDate.innerText = `Joined: ${new Date(
    user.createdAt
  ).toLocaleDateString()}`;

  let editAccount = document.createElement("button");
  //   editAccount.onclick = editProfile(event);
  editAccount.innerText = `EDIT ACCOUNT`;

  outputDiv.append(
    profilePic,
    username,
    fullname,
    about,
    joinDate,
    editAccount
  );
}

function fetchUser() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((user) => {
      profileBuilder(user);
    });
}

function saveUser(e) {
  e.preventDefault();

  const user = {
    username: usernameInput.value,
    fullName: fullNameInput.value,
    about: aboutInput.value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
      body: JSON.stringify(user),
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/users/${user.username}`, options)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      //   profileBuilder(user);
      sessionStorage.setItem("message", "Successfully saved.");
      window.location.replace("/profile/index.html");
    });
}

window.onload = (event) => {
  fetchPosts();
  fetchUser();
  dropDownUser();
};
