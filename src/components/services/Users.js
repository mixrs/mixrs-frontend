export function getCurrentUser() {
  return fetch(
    `http://localhost:8080/api/v1/users/240e94d1-a203-4456-91c9-09cbe7df2c6e`
  ).then((data) => data.json());
}
