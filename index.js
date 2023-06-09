const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  for (const passTime of passTimes) {
    const unixTimestamp = passTime.risetime;
    const formattedTime = new Date(unixTimestamp * 1000);

    console.log(`Next pass at ${formattedTime} for ${passTime.duration} seconds!`);
  }
});