/* Posts Page JavaScript */

"use strict";
const loginJSON = window.localStorage.getItem("login-data");
const bearer = JSON.parse(loginJSON);

function postLoad(array) {
  console.log(array);
  let postBody = document.querySelector("#posts");

  array
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
      
      let likeCount = document.createElement("button");
      
      let datePosted = document.createElement("p");
      datePosted.className = "p-2 text-body-secondary";

      let dateOfPost = new Date(post.createdAt).toLocaleString("en-US", {
        hour12: true,
      });

      postP.innerText = post.text;
      poster.innerText = post.username;

      likeCount.innerText = "Likes: " + post.likes.length;

      let linkedPoster = document.createElement("a");

      linkedPoster.href = `../profile.html?username=${post.username}`
      linkedPoster.appendChild(poster);
      

      if (post.likes.find(likes => likes.username === bearer.username)) {
        likeCount.className = "p-2 btn btn-danger btn-sm mb-3 me-2";
        let postLikeId = post.likes.filter(object => object.username === bearer.username).map(object => object._id)
        likeCount.onclick = function(){deleteLike(postLikeId)};
        console.log(postLikeId);
      }
      else {
        likeCount.className = "p-2 btn btn-secondary btn-sm mb-3 me-2";
        likeCount.onclick = function(){likePost(post._id)};
      }
      
      datePosted.innerText = dateOfPost;

      innerPostDiv.append(linkedPoster, postP);
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
  fetch(apiBaseURL + "/api/posts?limit=1000&offset=0", options)
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


function likePost(likeId) {
    console.log(likeId);
    let obj = {postId: likeId};
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer.token}`,
        },
        body: JSON.stringify(obj)
      };
      console.log(options);
      fetch(apiBaseURL + "/api/likes", options)
        .then((response) => response.json())
        .then((posts) => {
          window.location.assign("index.html");
          return posts;
        });
}

function deleteLike(likeId) {
    console.log(likeId);

    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer.token}`,
        },
      };
      console.log(options);
      fetch(apiBaseURL + `/api/likes/${likeId}`, options)
        .then((response) => response.json())
        .then((posts) => {
          window.location.assign("index.html");
          return posts;
        });
}

//function to switch between light and dark mode
function switchDisplayMode() {
  //debug to console 
  console.log(lightmode);
  //if statement for when button is checked
  if (lightmode.checked) {
      //use the function .querySelectorAll function to select and remove classes
      //we only have 3 classes we are selecting so we only did 3 for of statements, but this could of also been done in one for loop
      let navcolordark = document.querySelectorAll(".navColorDark")//select the class you want to remove and assign it to a variable
      for (const element of navcolordark) {
          element.classList.add("navColorLight");//add the "light mode" class
          element.classList.remove("navColorDark");//remove the "dark mode" class
        }//end of for of loop
        //repeat for all the other classes that need to switch between dark to light mode
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
  }//end of if statement
  else if (lightmode.checked == false) {//this could ov just beena else statement because the if button checked can only be true or false
    //this is the same base as the if statement above but switching from light to dark
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
  else console.log("Error! Mayday! Mayday!");//debug to console log and display this message
}

//assign a function to the button that constantly checks if the button is checked or not
lightmode.onchange = (event) => {

  switchDisplayMode();//call the switch mode function

}