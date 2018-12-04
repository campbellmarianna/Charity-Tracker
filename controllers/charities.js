// controllers/charities.js
const https = require('https');
const Donation = require('../models/Charity');

module.exports = function(app) {
    //ROOT ROUTE INDEX
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
                console.log(parsed.charityNavigatorURL)
                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {return res.send({ orgs: parsed});}

                //=> RETURN HTML
                return res.render('charities-index', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });
    })

    // Not operational yet
    // SHOW
    app.get('/charities/ein', function (req, res) {
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
                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {return res.send({ orgs: parsed});}

                //=> RETURN HTML
                return res.render('charities-index', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });
    })
}
