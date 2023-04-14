const { nextISSTimesForMyLocation } = require('./iss');

const timeConverter = function(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  for (const passTime of passTimes) {
    // e.g. Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
    const unix_timestamp = passTime.risetime;
    const formattedTime = new Date(unix_timestamp * 1000);

    console.log(`Next pass at ${formattedTime} for ${passTime.duration} seconds!`);
  }
});

// fetchISSFlyOverTimes({ latitude: 'abc', longitude: 999 }, (error, data) => {
//   console.log('error:', error);
//   console.log('data:', data);
// });

// fetchISSFlyOverTimes({ latitude: 49.2849107, longitude: -122.8677562 }, (error, data) => {
//   console.log('data:', data);
// });

// fetchCoordsByIP('42', (error, data) => {
//   console.log(`error: ${error}`);
//   console.log('data: ', data);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

