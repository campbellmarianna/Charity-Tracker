// test-donations.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Donation = require('../models/donation');

// add a sampleDonation
const sampleDonation = {
    "donation": "Socks & Shoes",
    "dateGiven": "11/18/18",
    "charity": "Red Cross"
}

chai.use(chaiHttp);

// tell mocha you want to test Donations (this string is taco - it can be anything)
describe('Donations', () => {
    /* use an after() test hook that mocha provides for the dump truck to come
around and delete all our sample donations after each test */
after(() => {
    Donation.deleteMany({donation: 'Socks & Shoes'}).exec((err, donations) => {
        cosole.log(donations)
        donations.remove();
    })
});
    //TEST INDEX
    // make taco name for the test
    it('should index ALL donations on /donations GET', (done) => {
        // use chai-http to make a request to your server
        chai.request(server)
            // send a GET request to root route
            .get('/donations')
            // wait for response
            .end((err,res) => {
                // check that the response status is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html;
                // end this test and move onto the next.
                done();
            });
    });

    //TEST NEW
    it('should display new form on /donations/new GET', (done) => {
        chai.request(server)
            .get(`/donations/new`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
    });

    it('should create a SINGLE donation on /donations POST', (done) => {
        chai.request(server)
            .post('/donations')
            .send(sampleDonation)
            //wait for response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move on to the next one
                done();
            });
    });
    // TEST SHOW
    it('should show a SINGLE donation /donations/<id> GET', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
            .get(`/donations/${data._id}`)
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
    // TEST EDIT
    it('should edit a SINGLE donation /donations/<id>/edit GET', (done) => {
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            chai.request(server)
            .get(`/donations/${data._id}/edit`)
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // TEST UPDATE
    it('should update a SINGLE donation on /donations/<id> PUT', (done) => {
        // create a donation during the UPDATE route test
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            // send a PUT request to UPDATE route
            .put(`/donations/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            // wait for a response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move to the next one
                done();
            });
        });
    });
    // TEST DELETE
    it('should delete a SINGLE donation on /donations/<id> DELETE', (done) => {
        // create donation during DELETE route test
        var donation = new Donation(sampleDonation);
        donation.save((err, data) => {
            // send chai-http to make a request to your server
            chai.request(server)
            .delete(`/donations/${data._id}?_method=DELETE`)
            // wait for a response
            .end((err, res) => {
                // check that the response is = 200 (success)
                res.should.have.status(200);
                // check that the response is a type html
                res.should.be.html
                // end this test and move to the next one
                done();
            });
        });
    });

});
