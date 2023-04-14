const { reject } = require('lodash');
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimesArr) {
  // success, print out the deets!
  for (const passTime of passTimesArr) {
    const unixTimestamp = passTime.risetime;
    const formattedTime = new Date(unixTimestamp * 1000);

    console.log(`Next pass at ${formattedTime} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(body => {
    printPassTimes(body); // callback returns undefined
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });
// fetchMyIP()
//   .then(fetchCoordsByIP) // callback is called with the arguments passed in from the resolve call of the promise function, so don't need to call the callback with arguments
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));