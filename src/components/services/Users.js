export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/fd9cb757-70bc-41cd-a511-d8ebffe7c243`
  ).then((data) => data.json());
}
