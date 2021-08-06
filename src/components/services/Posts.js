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
  postDetails.userId = "fd9cb757-70bc-41cd-a511-d8ebffe7c243";
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}/posts`, {
    method: "POST",
    body: JSON.stringify(postDetails),
  }).then((data) => data.json());
}
