export default function loggedInUser(token) {
  return fetch(`https://kinesis-server.vercel.app/loggedInUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
