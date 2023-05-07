export default function loggedInUser(token) {
  return fetch(`https://kinesis-server.onrender.com/loggedInUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
