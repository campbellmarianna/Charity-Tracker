/*
Model/Data Layer - where you put the code dedicated to interacting with the database
models/Donation.js
*/
/* Object Document Mapper */
// Check if your database is created and getting the right data
// https://robomongo.org/download
const mongoose = require('mongoose');

const Charity = mongoose.model('Charity', {
    charityName: String,
    mission: String,
    mailingAddress: Object,
    irsClassification: Object
})

module.exports = Charity;
