/*
Model/Data Layer - where you put the code dedicated to interacting with the database
models/Donation.js
*/
/* Object Document Mapper */
const mongoose = require('mongoose');

const Charity = mongoose.model('Charity', {
    ein: String
})

module.exports = Charity;
