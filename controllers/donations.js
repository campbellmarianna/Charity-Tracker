// controllers/donations.js
const Donation = require('../models/Donation');

module.exports = function(app, donation) {

    //ROOT ROUTE INDEX
    app.get('/', (req,res) => {
        Donation.find()
        .then(donations => {
            res.render('donations-index', { donations: donations })
        })
        .catch(err => {
            console.log(err);
        });
    });

    //NEW
    app.get('/donations/new', (req,res) => {
        res.render('donations-new', {});
    });

    //CREATE
    app.post('/donations', (req,res) => {
        Donation.create(req.body).then((donation) => {
            res.redirect(`/donations/${donation._id}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

    // SHOW
    app.get('/donations/:id', (req, res) => {
        // find donation
        Donation.findById(req.params.id).then((donation) => {
            // fetch its comment
            //Comment.find({ donationId: req.params.id }).then(comments => {
                //respond with the template with both values
            res.render('donations-show', { donation: donation })
            //})
        }).catch((err) => {
            // catch errors
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/donations/:id', function (req,res) {
        Donation.findByIdAndRemove(req.params.id).then((donation) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // EDIT
    app.get('/donations/:id/edit', (req, res) => {
        Donation.findById(req.params.id, function(err, donation) {
            res.render('donations-edit', {donation: donation});
        });
    });

    // UPDATE
    app.put('/donations/:id', (req,res) => {
        Donation.findByIdAndUpdate(req.params.id, req.body)
        .then(donation => {
            res.redirect(`/donations/${donation.id}`)
        })
        .catch(err => {
            console.log(err.message)
        });
    });
}
