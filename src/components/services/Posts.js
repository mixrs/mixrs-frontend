export function getAllPosts(channelId) {
    return fetch(`http://localhost:8080/api/v1/posts/channels/${channelId}`).then((data) =>
      data.json()
    );
  }
  