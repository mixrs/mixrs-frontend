export function getAllChannels() {
  return fetch("http://localhost:8080/api/v1/channels")
    .then((data) => data.json())
    .catch((err) => console.error(err));
}

export function createNewChannel(formData) {
  console.log(Array.from(formData));
  return fetch("http://localhost:8080/api/v1/channels", {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .catch((err) => console.error(err));
}

export function getChannelById(channelId) {
  return fetch(`http://localhost:8080/api/v1/channels/${channelId}`)
    .then((data) => data.json())
    .catch((err) => console.error(err));
}
