const Book = require("../../models/Books");
const asyncHandler = require("../../middlewares/asyncHandler");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({
    success: true,
    message: "Show all books",
    data: books,
  });
});
// async (req, res) => {
//   const books = await Book.find({});
//   res.status(200).json({
//     success: true,
//     message: "Show all books",
//     data: books,
//   });
// };

module.exports = getBooks;
