'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./module/book.js');
const req = require ('express/lib/request');
const verifyUser = require('./auth');

const mongoose = require('mongoose');

// connect momgoose to mongoosedb
mongoose.connect(`${process.env.DB_URL}`)

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
// implament epress
const app = express();

// if we want to recieve json data from request we need this
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {

  response.send('welcome')
})
// GET
app.get('/book', getBook);
// POST
app.post('/book', postBook);
// DELETE
app.delete('/book/:id', deleteBook);
// UPDATE
app.put('/book/:id', putBook)


async function getBook (req,res,next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('invalid token');
    } else {
    let queryObject = {}
    if (req.query.email) {
      queryObject.email = req.query.email;
    }
    try {
      const booksFromDb = await Book.find(searchObject);
      if (booksFromDb.length > 0) {
        res.status(200).send(booksFromDb);
      } else {
        res.status(404).send('error');
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('server error');
    }
  }
});
}

async function postBook(req,res,next){
  console.log(req.body);
  
  try{
    let createdBook = await Book.create(req.body);
  res.status(200).send(createdBook);  

  }catch(error){
    next(error)
  }
}

async function deleteBook (req, res, next) {

  let id = req.params.id;
  try{
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book was deleted!');
  } catch(err) {
    next(err)
  }
}

async function putBook (req, res, next) {
  
  let id = req.params.id;

  console.log(id);
  try {
    let updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true, overwrite: true});
    res.status(200).send(updatedBook);
  } catch(err) {
    next(err)
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
