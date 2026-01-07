const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Public route: get all books
router.route("/").get(getAllBooks);

// Protected routes: admin-only actions
router.route("/")
  .post(protect, createBook); // create book

router.route("/:id")
  .get(getSingleBook)           // view single book
  .put(protect, updateBook)     // update book
  .delete(protect, deleteBook); // delete book

module.exports = router;
