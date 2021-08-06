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
  postDetails.userId = "bef3b9a0-8c54-42d2-ac22-e5512c6a2340";
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}/posts`, {
    method: "POST",
    body: JSON.stringify(postDetails),
  }).then((data) => data.json());
}
