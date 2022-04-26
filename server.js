'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./module/book.js');

const mongoose = require('mongoose');

// connect momgoose to mongoosedb
mongoose.connect(`${process.env.DB_URL}`)

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/book',getBook); 

async function getBook (request,response,next) {
  try{
    let results = await Book.find();
    response.status(200).send(results);

  } catch(err) {
    next(err);
  }

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
