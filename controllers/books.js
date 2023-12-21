const Book = require('../models/book');



async function index(req, res) {
  const books = await Book.find({});
  res.render('books/index', { title: 'All Books', books });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const book = await Book.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
  const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
  res.render('movies/show', { title: 'Movie Detail', movie, performers });
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

module.exports = {
    index,
    show,
    new: newBook,
    create
  };