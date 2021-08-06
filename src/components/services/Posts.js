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
  postDetails.userId = "2a1a37c5-4eff-4826-b2fc-28f8d52070ae";
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}/posts`, {
    method: "POST",
    body: JSON.stringify(postDetails),
  }).then((data) => data.json());
}
