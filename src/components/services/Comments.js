export function getComments(channelId, postId) {
  return fetch(
    `http://localhost:8080/api/v1/channels/${channelId}/posts/${postId}/comments`
  )
    .then((data) => data.json())
    .catch((err) => err);
}

export function createComment(channelId, postId, comment) {
  return fetch(
    `http://localhost:8080/api/v1/channels/${channelId}/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }
  )
    .then((data) => data.json())
    .catch((err) => err);
}
