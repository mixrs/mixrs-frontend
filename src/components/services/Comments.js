export function getComments(channelId, postId) {
    return fetch(
      `http://localhost:8080/api/v1/channels/${channelId}/posts/${postId}/comments`
    ).then((data) => data.json());
  }
  