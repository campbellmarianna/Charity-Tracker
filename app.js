const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const Donation = require("./models/Donation.js");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//INDEX
app.get('/donations', (req,res) => {
    res.render('donations-index', { Donation: Donation })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
