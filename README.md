# Charity Tracker

This app is intended to help people keep track of donations they make to charities
**_Charity Tracker_**  An application created with Node, Express and the official Charity Navigator API.

Official Charity Navigator API website: https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397

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
