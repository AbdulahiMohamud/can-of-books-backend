'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: Boolean, required: true},
  email: {type: String}
});


const Book = mongoose.model('Book',bookSchema);

module.exports = Book;