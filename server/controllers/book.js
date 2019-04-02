/**
 * GET /books
 * List all books.
 */
const Book = require("../models/Book.js");

exports.getBooks = (req, res) => {
  console.log("Hey there!");
  Book.find((err, docs) => {
    res.render("books", { books: docs });
  });
};
