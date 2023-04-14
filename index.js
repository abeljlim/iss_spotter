const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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

