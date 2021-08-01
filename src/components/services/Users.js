export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/3a6281fa-637a-4afa-8915-44fac0e594b5`
  ).then((data) => data.json());
}
