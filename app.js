// Express - define routes
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const donationsController = require('./controllers/donations');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


donationsController(app);

// mongoose.connect('mongodb://localhost/charity-tracker', { useNewUrlParser: true });

// Point this production mongodb database URI
const port = process.env.PORT || 3000;

// Mongoose Connection
const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/charity_tracker";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});

module.exports = app;
