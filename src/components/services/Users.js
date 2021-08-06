export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/2a1a37c5-4eff-4826-b2fc-28f8d52070ae`
  ).then((data) => data.json());
}

export function getUserById(userId) {
  return fetch(`http://localhost:8080/api/v1/users/${userId}`).then((data) =>
    data.json()
  );
}
