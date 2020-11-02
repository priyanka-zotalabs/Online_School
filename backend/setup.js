/* eslint-env jest */
// This was inpired by:
// https://medium.com/@art.longbottom.jr/concurrent-testing-with-mongoose-and-jest-83a27ceb87ee
const mongoose = require('mongoose');
const config = require('./config');

beforeEach((done) => {
  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    const connectionURL = `mongodb://${config.dbDetails.host}:${config.dbDetails.port}/degreeIssuanceAndVerification`;
    mongoose.connect(connectionURL);
  }
  return done();
});
