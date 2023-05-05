export default function loggedInUser(token) {
  return fetch(`http://localhost:3000/loggedInUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
