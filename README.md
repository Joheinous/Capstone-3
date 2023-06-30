# Gooser Social Media!

Gooser is the latest hit open source social media to hit the social media scene. 

Gooser contains support for posting, profile viewing, logging in and registering! As well as dark and light mode support.

Login page:
![image](https://github.com/Joheinous/Capstone-3/assets/130480122/fd4b4f19-1415-44e5-a8c1-21c23deae946)

Register page: 
![image](https://github.com/Joheinous/Capstone-3/assets/130480122/19c4f2eb-87b0-40d1-9137-e5f6d8dec9e5)

Posts page:
![image](https://github.com/Joheinous/Capstone-3/assets/130480122/303df826-1aaa-4d8f-a8eb-cf054f09e977)

Profile page:
![image](https://github.com/Joheinous/Capstone-3/assets/130480122/a7b791e4-e2d7-4ef6-906f-796afeb9ba88)


Interesting piece of JS:
```
if (post.likes.find((likes) => likes.username === bearer.username)) {
        likeCount.className = "p-2 btn btn-danger btn-sm mb-3 me-2";
        let postLikeId = post.likes
          .filter((object) => object.username === bearer.username)
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
```
