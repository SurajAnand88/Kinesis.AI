const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Images = mongoose.model("images", imageSchema);
module.exports = Images;
