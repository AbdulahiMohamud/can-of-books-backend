'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./module/book.js');


async function seed() {

  await Book.create({
    title:'The Titan\'s Curse',
    description:'When the goddess Artemis goes missing, she is believed to have been kidnapped. And now it\'s up to Percy and his friends to find out what happened. Who is powerful enough to kidnap a goddess? They must find Artemis before the winter solstice, when her influence on the Olympian Council could swing an important vote on the war with the titans. Not only that, but first Percy will have to solve the mystery of a rare monster that Artemis was hunting when she disappeared-a monster rumored to be so powerful it could destroy Olympus forever.',
    status:true
  });

  await Book.create({
    title:'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    description:'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    status:false
  });

  await Book.create({
    title:'Oh, the Places You\'ll Go!',
    description:'From soaring to high heights and seeing great sights to being left in a Lurch on a prickle-ly perch, Dr. Seuss addresses life\'s ups and downs with his trademark humorous verse and whimsical illustrations.The inspiring and timeless message encourages readers to find the success that lies within, no matter what challenges they face. A perennial favorite and a perfect gift for anyone starting a new phase in their life!',
    status:true
  });
  console.log('planted the seed!');
  mongoose.disconnect()
}



seed();

