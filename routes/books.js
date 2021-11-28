const express = require("express");
const router = express.Router();
const { books } = require("../controllers");

router.get("/", books.getBooks);

router.get("/:bookID", books.getSingleBook);

router.post("/", books.createBook);

router.patch("/:bookID", books.updateBook);

router.delete("/:bookID", books.deleteBook);

// router.route("/").get((req, res) => {
//   res.send("Get all books");
// });

// router.route("/").post((req, res) => {
//   res.send("Add book");
// });

module.exports = router;
