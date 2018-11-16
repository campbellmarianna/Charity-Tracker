/*
Model/Data Layer - where you put the code dedicated to interacting with the database
models/Donation.js
*/
/* Object Document Mapper */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-tracker');

const Donation = mongoose.model('Donation', {
    donation: String,
    dateGiven: String,
    address: String
});

module.exports = Donation;
