export function getAllPosts(channelId) {
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}/posts`).then(
    (data) => data.json()
  );
}

export function getPostById(channelId, postId) {
  return fetch(
    `http://localhost:8080/api/v1/channels/${channelId}/posts/${postId}`
  ).then((data) => data.json());
}

export function createPost(postDetails, channelId) {
  postDetails.userId = "60ff0a8a-68a8-460f-9f08-5ac1c2b709f5";
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}/posts`, {
    method: "POST",
    body: JSON.stringify(postDetails),
  }).then((data) => data.json());
}
