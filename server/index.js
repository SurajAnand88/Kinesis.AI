const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connect = require("./Config/connect");
const pearlAi = require("./Routes/pearlAi");
const postRoute = require("./Routes/postRoute");
const searchRoute = require("./Routes/searchRoute");
const {
  loginRoute,
  registerRoute,
  loggedInUserRoute,
} = require("./Routes/userRoute");

const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/v1/pearlai", pearlAi);
app.use("/post", postRoute);
app.use("/search", searchRoute);
app.post("/login", loginRoute);
app.post("/register", registerRoute);
app.get("/loggedInUser", loggedInUserRoute);

connect();
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
