export default function checkToken() {
  const token = localStorage.getItem("kinesis_token") || null;
  return new Promise((resolve, reject) => {
    if (token) {
      resolve("userExist");
    }
    reject("user does not exist");
  });
}
