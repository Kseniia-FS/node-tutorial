const Book = require("../../models/Books");

const deleteBook = async (req, res) => {
  const { bookID } = req.params;
  const book = await Book.findByIdAndDelete(bookID);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete book with id: ${bookID}`,
      data: book,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book is deleted",
    data: book,
  });
};

module.exports = deleteBook;
