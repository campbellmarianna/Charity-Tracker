// Express - define routes
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const https = require('https');


const app = express();

const mongoose = require('mongoose');
const donationsController = require('./controllers/donations');

const Donation = require('./models/Donation');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Tell your Express app that your static files will live in the public folder
app.use(express.static('public'));

donationsController(app);

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

// req = {
//   params: {
//     app_id: process.env.app_id;,
//     app_key: process.env.app_key;
//   }
// }
// Protected path attempt
//https://api.data.charitynavigator.org/v2/Organizations?api_id='+`${process.env.app_id}`+'&api_key='+`${process.env.app_key}` +'search='+ term
//Charity routes
app.get('/charities', function (req, res) {
    var queryString = req.query.term;
    // Encode the query string to remove white spaces and restricted characters
    var term = encodeURIComponent(queryString);
    // Put the search term into the giphy API search URL
    var url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=246b4b41&app_key=b45841a7b4baf09d703c4f717a6d4927&pageSize=3&search='+ term

    https.get(url, function(response) {
        // Set encoding of response to utf8
        // READ ARTICLE ABOUT THIS TONIGHT
        response.setEncoding('utf8');

        var body = '';

        response.on('data', function(d) {
            // Continuously update stream with data from charity navigator
            body += d;
        });

        response.on('end', function() {
            // when data is fully received parse into JSON
            var parsed = JSON.parse(body);
            // Render the home template and pass the charity data into the template
            // console.log(parsed)
            res.render('charities-index', {orgs: parsed})
        });
    });
})


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
