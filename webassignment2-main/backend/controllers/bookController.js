const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Book = require('../models/bookModel');

// Home
exports.home = bigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the home page",
  });
});

// Create book
exports.createBook = bigPromise(async (req, res, next) => {
  const { title, thumbnail, author, price, description, stock } = req.body;

  if (!title || !author || !thumbnail || !price || !description) {
    return next(new CustomError("Please provide all the required fields", 400));
  }

  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    data: book,
  });
});

// Get all books
exports.getAllBooks = bigPromise(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// Get single book
exports.getSingleBook = bigPromise(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new CustomError(`Book with id ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

// Update book
exports.updateBook = bigPromise(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new CustomError(`Book with id ${req.params.id} not found`, 404));
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: book,
  });
});

// Delete book
exports.deleteBook = bigPromise(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new CustomError(`Book with id ${req.params.id} not found`, 404));
  }

  await book.deleteOne();

  res.status(200).json({
    success: true,
    data: "Book deleted successfully",
  });
});
