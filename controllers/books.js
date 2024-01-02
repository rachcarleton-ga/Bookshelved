const Book = require('../models/book');
const User = require('../models/user')


async function index(req, res) {
  const books = await Book.find();
  res.render('books/index', { title: 'All Books', books });
}

async function show(req, res) {
  const book = await Book.findById(req.params.id)
  res.render('books/show', { title: 'Book Detail', book });
}

function newBook(req, res) {
  res.render('books/new', { title: 'Add Book', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const book = await Book.create(req.body);
    res.redirect(`/books/${book._id}`);
  } catch (err) {
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