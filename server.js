'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./module/book.js');
const req = require ('express/lib/request');

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

app.get('/test', (request, response) => {

  response.send('test request received')
})
// GET
app.get('/book', getBook);
// POST
app.post('/book', postBook);
// DELETE
app.delete('/book/:id', deleteBook);


async function getBook (req,res,next) {
  try{
    let queryObject = {}
    if (req.query.title) {
      queryObject.title = req.query.title;
    }
    let results = await Book.find();
    res.status(200).send(results);

  } catch(err) {
    next(err);
  }

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
  console.log(id);
  try{
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book was deleted!');
  } catch(err) {
    next(err)
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
