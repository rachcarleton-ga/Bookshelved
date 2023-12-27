const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});
	
const bookSchema = new Schema({
  title: String,
  author: String,
  publishYear: Number,
  publishCompany: String,
  genre: String,
  description: String,
  reviews: [reviewSchema]
}, {
    timestamps: true
});



module.exports = mongoose.model('Book', bookSchema);