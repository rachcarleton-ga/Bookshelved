const Book = require('../models/book');


async function deleteReview(req, res) {
  console.log("test")
  const book = await Book.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  if (!book) return res.redirect('/books');
  book.reviews.remove(req.params.id);
  await book.save();
  res.redirect(`/books/${book._id}`);
}

async function create(req, res) {
  const book = await Book.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  book.reviews.push(req.body);
  try {
    await book.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/books/${book._id}`);
}

module.exports = {
    create,
    delete: deleteReview
  };
  