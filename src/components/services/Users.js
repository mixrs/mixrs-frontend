export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/60ff0a8a-68a8-460f-9f08-5ac1c2b709f5`
  ).then((data) => data.json());
}

export function getUserById(userId) {
  return fetch(`http://localhost:8080/api/v1/users/${userId}`).then((data) =>
    data.json()
  );
}
