const request = require('request-promise-native');
const srcURL = 'https://api.ipify.org/?format=json';

// fetchMyIP function that returns a promise
const fetchMyIP = function() {
  return request(srcURL);
};

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

/*
 * Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
 * Input: JSON body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const srcURL = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(srcURL);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP) // callback is called with the arguments passed in from the resolve call of the promise function, so don't need to call the callback with arguments
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response; // so callback returns a value instead of a promise, which I guess can be handled by the promise .then call as well as a Promise object
    });
};

module.exports = { nextISSTimesForMyLocation };