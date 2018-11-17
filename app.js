const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const Donation = require("./models/Donation.js");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// OUR MOCK ARRAY OF PROJECTS
// let donations = [
//   { donation: "socks", dateGiven: "11/14/18", charity: "GW" },
//   { donation: "slipperies", dateGiven: "11/15/18", charity: "RC"  }
// ]

//INDEX
app.get('/donations', (req,res) => {
    Donation.find()
    .then(donations => {
        res.render('donations-index', { donations: donations })
    })
    .catch(err => {
        console.log(err);
    })
});

//NEW
app.get('/donations/new', (req,res) => {
    res.render('donations-new', {});
});

//CREATE
app.post('/donations', (req,res) => {
    Donation.create(req.body).then((donation) => {
    res.redirect('/donations');
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
        res.redirect('/donations');
    }).catch((err) => {
        console.log(err.message);
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});
