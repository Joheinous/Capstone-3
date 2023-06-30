"use strict";

const fullNameInput = document.querySelector("#full-name-input");
const aboutInput = document.querySelector("#about-input");
const loginData = getLoginData();
let searchParams = new URLSearchParams(window.location.search)
let user = searchParams.get('username')
let username
console.log(user);
if (loginData.username !== user) {
   username = user;
  
}
else {
  username = loginData.username;
 
}

if (loginData.username !== user) {
  let hide = document.querySelector("#postBox2");
  let hide2 = document.querySelector("#editButton");
  hide.style.display = "none";
  hide2.style.display = "none";
}


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
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  console.log(options);
  fetch(apiBaseURL + `/api/posts?username=${username}`, options)
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
  outputDiv.innerHTML = "";
  let profilePic = document.createElement("img");
  profilePic.src = `https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png`;
  profilePic.className = "profilePic";
  let username = document.createElement("h2");
  username.className = "bodyColorDark mr-auto";
  username.innerText = user.username;
  let fullname = document.createElement("h3");
  fullname.innerText = user.fullName;
  let about = document.createElement("h5");
  about.innerText = user.bio;
  let joinDate = document.createElement("h5");
  joinDate.innerText = `Joined: ${new Date(
    user.createdAt
  ).toLocaleDateString()}`;



  outputDiv.append(
    profilePic,
    username,
    fullname,
    about,
    joinDate
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
  fetch(apiBaseURL + `/api/users/${username}`, options)
    .then((response) => response.json())
    .then((user) => {
      profileBuilder(user);
    });
}

function saveUser(e) {
  e.preventDefault();

  const user = {
    fullName: fullNameInput.value,
    bio: aboutInput.value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(user),
  };
  console.log(options);
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      profileBuilder(user);
      //   sessionStorage.setItem("message", "Successfully saved.");
      //   window.location.replace("/profile/index.html");
    });
}

let showDetails = false;
function hideOrShowDetails() {
  const detailsSection = document.getElementById("edit-submit");
  showDetails = !showDetails;
  toggleElement(detailsSection, showDetails);
}

function toggleElement(htmlElement, show) {
  if (show) {
    htmlElement.style.display = "block";
  } else {
    htmlElement.style.display = "none";
  }
}

window.onload = (event) => {
  fetchPosts();
  fetchUser();
  dropDownUser();
};
function switchDisplayMode() {
  console.log(lightmode);
  //make varaibles for every color that will change
  if (lightmode.checked) {
      // let dark = document.querySelectorAll(".bg-dark")
      let navcolordark = document.querySelectorAll(".navColorDark")
      for (const element of navcolordark) {
          element.classList.add("navColorLight");
          element.classList.remove("navColorDark");
        }
        let bodycolordark = document.querySelectorAll(".bodyColorDark")
        for (const element of bodycolordark) {
          element.classList.add("bodyColorLight");
          element.classList.remove("bodyColorDark");
        }

        let divcolordark = document.querySelectorAll(".divColorDark")
        for (const element of divcolordark) {
          element.classList.add("divColorLight");
          element.classList.remove("divColorDark");
        }          
  }
  else if (lightmode.checked == false) {
      let light = document.querySelectorAll(".navColorLight");
      for (const element of light) {
          element.classList.add("navColorDark");
          element.classList.remove("navColorLight");
      }
      let bodycolordark = document.querySelectorAll(".bodyColorLight")
      for (const element of bodycolordark) {
        element.classList.add("bodyColorDark");
        element.classList.remove("bodyColorLight");
      }

      let divcolordark = document.querySelectorAll(".divColorLight")
      for (const element of divcolordark) {
        element.classList.add("divColorDark");
        element.classList.remove("divColorLight");
      } 
  }
  else console.log("Error! Mayday! Mayday!");
}

lightmode.onchange = (event) => {

  switchDisplayMode();

}