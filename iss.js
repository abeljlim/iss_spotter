/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const srcURLForIP = 'https://api.ipify.org/?format=json';

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(srcURLForIP, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const data = JSON.parse(body);
    if (Object.keys(data).length === 0) {
      callback(Error("IP not found"), null);
      return;
    }

    // happy path
    callback(null, data.ip);
  });
};

const srcURLEndpointForCoords = `http://ipwho.is/`;

const fetchCoordsByIP = function(ip, callback) {
  const srcURL = `${srcURLEndpointForCoords}${ip}`;
  request(srcURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if we get here, all's well and we got the data
    const data = JSON.parse(body);
    if (Object.keys(data).length === 0) {
      callback(Error("No data"), null);
      return;
    }

    // error handling of invalid IP in URL
    if (!data.success) {
      callback(Error(data.message), null);
      return;
    }

    // const latitude = data.latitude;
    // const longitude = data.longitude;
    const { latitude, longitude } = data;

    // happy path
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };