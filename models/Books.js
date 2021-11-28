const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookSchema = Schema({
  author: { type: String, required: [true, "Please add author name!"] },
  imageLink: {
    type: String,
    maxlength: [250, "Please provide correct link, less than 250 s."],
  },
  language: { typre: String },
  link: {
    type: String,
    maxlength: [300, "Please provide correct link, less than 250 s."],
  },
  pages: { type: Number },
  title: {
    type: String,
    required: [true, "Please add book title!"],
    unique: [true, "Please provide unique title!"],
  },
  year: { type: Number },
  currency: {
    type: String,
    enum: ["eu", "us", "ua"],
  },
});

module.exports = model("book", bookSchema);
