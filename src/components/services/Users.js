export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/bef3b9a0-8c54-42d2-ac22-e5512c6a2340`
  ).then((data) => data.json());
}

export function getUserById(userId) {
  return fetch(`http://localhost:8080/api/v1/users/${userId}`).then((data) =>
    data.json()
  );
}
