const { reject } = require('lodash');
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimesArr) {
  // success, print out the deets!
  for (const passTime of passTimesArr) {
    const unix_timestamp = passTime.risetime;
    const formattedTime = new Date(unix_timestamp * 1000);

    console.log(`Next pass at ${formattedTime} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(body => {
    printPassTimes(body); // callback returns undefined
    return new Promise((resolve, reject) => reject(new Error("error message to catch"))); // works as intended - a new Promise passes in arguments to the callback function that are resolve and reject callbacks that can be used
    //reject(new Error("error message to catch")); // doesn't work because we need the reject or resolve to come from a Promise
  })
  .then(() => {
    console.log("Called after the previous then which returned undefined?"); // tinkering to see what happens when a promise is not returned; looks like a Promise being returned results in waiting for the Promise to be fulfilled before moving to the next "then(...)" being done whereas nothing being returned results in the next "then(...)" being done in a synchronous fashion
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });
// fetchMyIP()
//   .then(fetchCoordsByIP) // callback is called with the arguments passed in from the resolve call of the promise function, so don't need to call the callback with arguments
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));