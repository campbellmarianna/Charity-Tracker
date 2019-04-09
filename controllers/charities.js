// controllers/charities.js
const https = require('https');
const Donation = require('../models/Donation');

module.exports = function(app) {
    let url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=246b4b41&app_key=b45841a7b4baf09d703c4f717a6d4927&pageSize=3'

    //ROOT ROUTE INDEX
    app.get('/charities', function (req, res) {
        var queryString = req.query.term;
        // Encode the query string to remove white spaces and restricted characters
        var term = encodeURIComponent(queryString);
        // Put the search term into the giphy API search URL
        // Axois.get(url+ `&search=` + term).then(function(response) {
        // const api_data = response.data
    // })
        https.get(url + `&search=` + term, function(response) {
            // Set encoding of response to utf8
            response.setEncoding('utf8');

            var body = '';

            response.on('data', function(d) {
                // Continuously update stream with data from charity navigator
                body += d;
            });

            response.on('end', function() {
                // when data is fully received parse into JSON
                var parsed = JSON.parse(body);

                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {res.json({ orgs: parsed});}
                // return res.json(parsed)
                //=> RETURN HTML
                return res.render('charities-index', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });
    })

    // SHOW
    app.get('/charities/:id', (req, res) => {
        const charityId = req.params.id;

        https.get(url, function(response) {
            // Set encoding of response to utf8
            response.setEncoding('utf8');

            var body = '';

            response.on('data', function(d) {
                // Continuously update stream with data from charity navigator
                body += d;
            });

            response.on('end', function() {
                // when data is fully received parse into JSON
                var parsed = JSON.parse(body)[charityId];

                // Donation.create

                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {return res.json({ orgs: parsed});}
                // return res.json(parsed)
                //=> RETURN HTML
                // return res.json(parsed)
                return res.render('charities-show', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });

    })
}
