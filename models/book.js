const mongoose = require('mongoose');

const Schema = mongoose.Schema;
	
const bookSchema = new Schema({
  title: String,
  author: String,
  publishYear: Number,
  publishCompany: String,
  genre: String,
  description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);