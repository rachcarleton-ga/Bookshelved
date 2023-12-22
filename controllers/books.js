const Book = require('../models/book');
const User = require('../models/user')


async function index(req, res) {
  const books = await Book.find();
  console.log(books)
  res.render('books/index', { title: 'All Books', books });
}

async function show(req, res) {
  const book = await Book.findById(req.params.id)
  res.render('books/show', { title: 'Book Detail', book });
}

function newBook(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('books/new', { title: 'Add Book', errorMsg: '' });
}

async function create(req, res) {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new book
    const book = await Book.create(req.body);
    // Redirect to the new book's show functionality 
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('books/new', { errorMsg: err.message });
  }
}

async function addReview(req, res) {
  const book = await Book.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar
    book.reviews.push(req.body)
    try {
      await book.save()
      res.redirect(`/books/${book._id}`)
    } catch (err){
      console.log(err);
    res.render('books/', { errorMsg: err.message });
    }
}
module.exports = {
    index,
    show,
    new: newBook,
    create,
    addReview
  };