const express = require("express");
const dotenv = require("dotenv");
const User = require("../Modal/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});

const openai = new OpenAIApi(configuration);
const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { text } = req.body;
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token) {
        let { _id } = await jwt.verify(
          token,
          process.env.JSONTOKEN_PRIVATE_KEY
        );
        let user = await User.findOne({ _id: _id });
        console.log(user, authorization, token);
        if (user.credit > 0) {
          const response = await openai.createImage({
            prompt: text,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
          });
          user = await User.updateOne(
            { _id: user._id },
            { $set: { credit: user.credit - 1 } }
          );

          const img = response.data.data[0].b64_json;
          res.status(200).json({ photo: img });
        } else {
          res.status(300).send("Not Enough Credit to Generate Image");
        }
      } else {
        res.status(300).send("Invalid Token ");
      }
    } else {
      res.status(300).send("Invalid authorization Headers");
    }
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
