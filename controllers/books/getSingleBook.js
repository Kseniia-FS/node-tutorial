const Book = require("../../models/Books");

const getSingleBook = async (req, res) => {
  const { bookID } = req.params;
  const book = await Book.findById(bookID);
  res.status(200).json({
    success: true,
    message: "Book exist",
    data: book,
  });
};

module.exports = getSingleBook;
