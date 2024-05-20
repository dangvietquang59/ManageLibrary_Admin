const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Genre: { type: String, required: true },
  Summary: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Status: { type: Boolean, default: false },
  Image: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
