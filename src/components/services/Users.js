export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/30a39216-628e-48bd-a254-e2c8ed35e828`
  ).then((data) => data.json());
}

export function getUserById(userId) {
  return fetch(`http://localhost:8080/api/v1/users/${userId}`).then((data) =>
    data.json()
  );
}
