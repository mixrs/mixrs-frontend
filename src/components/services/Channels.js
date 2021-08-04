export function getAllChannels() {
  return fetch("http://localhost:8080/api/v1/channels")
    .then((data) => data.json())
    .catch((err) => console.error(err));
}

export function createNewChannel(postDetails) {
  return fetch("http://localhost:8080/api/v1/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postDetails),
  })
    .then((data) => data.json())
    .catch((err) => console.error(err));
}
