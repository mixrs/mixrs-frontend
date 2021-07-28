export function getAllChannels() {
  return fetch("http://localhost:8080/api/v1/channels").then((data) =>
    data.json()
  );
}
