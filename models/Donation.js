/*
Model/Data Layer - where you put the code dedicated to interacting with the database
models/Donation.js
*/
/* Object Document Mapper */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-tracker', { useNewUrlParser: true });

const Donation = mongoose.model('Donation', {
    donation: String,
    dateGiven: String,
    charity: String
});

module.exports = Donation;
