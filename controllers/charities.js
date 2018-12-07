// controllers/charities.js
const https = require('https');
const Charity = require('../models/charity');

module.exports = function(app) {
    let url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=246b4b41&app_key=b45841a7b4baf09d703c4f717a6d4927&pageSize=3'

    //ROOT ROUTE INDEX
    app.get('/charities', function (req, res) {
        var queryString = req.query.term;
        // Encode the query string to remove white spaces and restricted characters
        var term = encodeURIComponent(queryString);
        // Put the search term into the giphy API search URL
        // var url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=246b4b41&app_key=b45841a7b4baf09d703c4f717a6d4927&pageSize=3&search='+ term
// &search='+ term
        https.get(url + `&search=` + term, function(response) {
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
                // console.log(`Charity Navigator URLs${{orgs: parsed}}`)
                // for each org in orgs array
                function charityNameToLocalModel(orgs) {
                    orgs.forEach(function(charity) {
                        // console.log(` Charity ein number: ${charity.charityName}`);
                        // create new instance of model
                        // add property charity.name to model
                        Charity.create(charity)
                    });
                }

                charityNameToLocalModel(parsed);

                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {return res.json({ orgs: parsed});}
                // return res.json(parsed)
                //=> RETURN HTML
                return res.render('charities-index', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });
    })
// Very helpful: https://github.com/jayceazua/iMakeTunesMovie/blob/master/server.js
    // SHOW
    app.get('/charities/:id', (req, res) => {
        const charityId = req.params.id;

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
                var parsed = JSON.parse(body)[charityId];

                // => RETURN JSON
                if (req.header('Content-Type') == 'application/json') {return res.json({ orgs: parsed});}
                // return res.json(parsed)
                //=> RETURN HTML
                // return res.json(parsed)
                return res.render('charities-show', {orgs: parsed}); //=> RENDER A TEMPLATE
            });
        });

    })
    // app.get('/charities/:id', function (req, res) {
    //     // find charity
    //     Charity.findById(req.params.id).then((charity) => {
    //         // fetch its comment
    //         //Comment.find({ donationId: req.params.id }).then(comments => {
    //             //respond with the template with both values
    //         res.render('charities-show', { charity: charity})
    //         //})
    //     }).catch((err) => {
    //         // catch errors
    //         console.log(err.message);
    //     });
    // });
}
