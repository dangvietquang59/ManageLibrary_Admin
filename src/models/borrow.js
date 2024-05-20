const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    statusBorrow: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

module.exports = Borrow;
