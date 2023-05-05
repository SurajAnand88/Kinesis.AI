const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected Database");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
