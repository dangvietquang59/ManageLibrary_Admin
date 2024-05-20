const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book");
const authMiddleware = require("../middleware/authentication");

router.get("/get-books", bookController.getBooks);
router.post(
  "/borrow-book",
  authMiddleware.verifyToken,
  bookController.borrowBook
);
router.get("/get-loan", bookController.getLoan);
router.post("/create-book", bookController.createBook);
router.post("/update-borrow-book/:id", bookController.updateBook);

module.exports = router;
