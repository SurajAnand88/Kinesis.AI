const express = require("express");
const User = require("../Modal/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../Config/generateAccessToken");

const loginRoute = async (req, res) => {
  try {
    const { email, password, googleId, name } = req.body;

    let user = await User.findOne({ email: email }).select(
      "_id userusername email password authType credit"
    );
    if (!user && googleId) {
      user = await User.create({
        username: name,
        email,
        authType: "google",
        credit: 3,
      });
      const token = await generateAccessToken(user.toJSON());
      res.status(200).send({
        token,
        user,
        message: "Access Granted , You have Logged in successfully",
      });
    } else if (user) {
      if (!googleId && bcrypt.compareSync(password, user.password)) {
        const token = await generateAccessToken(user.toJSON());
        user.toJSON();
        delete user.password;
        res.status(200).send({
          token,
          user,
          message: "Access Granted , You have Logged in successfully",
        });
      } else if (googleId) {
        const token = await generateAccessToken(user.toJSON());
        user.toJSON();
        res.status(200).send({
          token,
          user,
          message: "Access Granted , You have Logged in successfully",
        });
      } else {
        res.status(300).send("Invalid Password");
      }
    } else {
      res.status(300).send("Invalid Email");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const registerRoute = async (req, res, next) => {
  const data = req.body;
  data.authType = "form";
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      res.status(500).send("user already registered with this email");
    } else {
      data.password = bcrypt.hashSync(data.password);
      await User.create({
        ...data,
        credit: 3,
      });
      res.status(200).send("Registration Successful");
    }
  } catch (error) {
    res.send(error.message).status(500);
  }
};

const loggedInUserRoute = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token) {
        let user = await jwt.verify(token, process.env.JSONTOKEN_PRIVATE_KEY);

        user = await User.findOne({ _id: user._id }).select(
          "_id username email authType credit"
        );

        res.status(200).send({
          user,
        });
      } else {
        res.status(300).send("Invalid Token ");
      }
    } else {
      res.status(300).send("Invalid authorization Headers");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { loginRoute, registerRoute, loggedInUserRoute };
