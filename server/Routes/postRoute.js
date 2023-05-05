const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config();
const Images = require("../Modal/allImagesModal");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const images = await Images.find({});
    res.status(200).json({
      data: images.reverse(),
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, text, photo } = req.body;
    const url = await cloudinary.uploader.upload(photo);

    const newImage = await Images.create({
      name,
      Text: text,
      url: url.url,
    });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
