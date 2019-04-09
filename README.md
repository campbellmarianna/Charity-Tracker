# Donation Tracker

![Github](https://img.shields.io/github/languages/top/campbellmarianna/Donation-Tracker.svg)

This app is intended to help people keep track of donations they make to charities.
**_Donation Tracker_** was created with Node, Express and the official Charity Navigator API.

Official Donation Navigator API website: https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397

Website: https://charity-tracker-mc.herokuapp.com/

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) >= 10.11.0 installed.

```sh
git clone https://github.com/campbellmarianna/Charity-Tracker.git
cd charity-tracker
npm i && nodemon
```

The app should now be running on [localhost:3000](http://localhost:3000/).

User can create a donation and search for charities

```
Index - http://localhost:3000/
Show - http://localhost:3000/donations/:id
Edit - http://localhost:3000/donations/:id/edit
Delete - http://localhost:3000/donations/:id
Charity Search - http://localhost:3000/charities
```

The Charity search gives you charities based on keywords

## Installing
Mocha and Chia will need to be installed for running tests.

```sh
npm install mocha
npm install chia
```

## Running the tests

Make sure you have [Mocha](https://mochajs.org/) & [Chia](https://www.chaijs.com/) installed.

Inside the project directory type `mocha` to run the tests.

### Break down into end to end tests

These tests check each route to make sure a HTML template is rendered.

```
// tell mocha you want to test Donations (this string is taco - it can be anything)
describe('Donations', () => {
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
});
```
