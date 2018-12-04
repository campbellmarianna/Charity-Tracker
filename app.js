// Express - define routes
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const app = express();

const mongoose = require('mongoose');
const donationsController = require('./controllers/donations');
const charitiesController = require('./controllers/charities');

const Donation = require('./models/Donation');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Tell your Express app that your static files will live in the public folder
app.use(express.static('public'));

donationsController(app);
charitiesController(app);

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

// Point this production mongodb database URI
const port = process.env.PORT || 3000 ;

// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/charity-tracker";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

app.listen(port, () => {
    console.log('App listening on port 3000!')
});

// module.exports = app;
