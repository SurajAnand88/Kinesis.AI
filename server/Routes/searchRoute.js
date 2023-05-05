const express = require("express");
const Images = require("../Modal/allImagesModal");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const images = await Images.find({
      Text: { $regex: `${q}`, $options: "i" },
    });
    res.status(200).json({
      data: images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
