const Book = require("../models/book");
const Borrow = require("../models/borrow");
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const borrowBook = async (req, res) => {
  try {
    const { bookId, userId, returnDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại" });
    }

    const borrow = new Borrow({
      bookId: bookId,
      userId: userId,
      returnDate: returnDate,
    });

    await borrow.save();

    res.status(201).json({ message: "Mượn sách thành công" });
  } catch (error) {
    console.error("Lỗi khi mượn sách:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi mượn sách" });
  }
};

const getLoan = async (req, res) => {
  try {
    const loans = await Borrow.find().populate("bookId").populate("userId");
    res.status(200).json(loans);
  } catch (error) {
    console.error("Lỗi hiển thị mượn trả", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy dữ liệu" });
  }
};

const createBook = async (req, res) => {
  try {
    const { Title, Author, Genre, Summary, Quantity, Status, Image } = req.body;

    const newBook = new Book({
      Title,
      Author,
      Genre,
      Summary,
      Quantity,
      Status,
      Image,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};
const updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await Borrow.findById(id);

    if (!borrow) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin mượn sách" });
    }

    borrow.statusBorrow = true;
    await borrow.save();

    res.json({ message: "Cập nhật trạng thái mượn sách thành công", borrow });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái mượn sách:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật trạng thái mượn sách" });
  }
};
module.exports = { getBooks, borrowBook, getLoan, createBook, updateBook };
