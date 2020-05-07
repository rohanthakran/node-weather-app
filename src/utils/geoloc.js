
const request = require('request');

const geocode = (address, callback) => {
    const geourl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoidGVja292bG9nIiwiYSI6ImNrOXRqdjZ6MzFlbGwzaG4xZjVsZ3pjazUifQ.P5bhT-Q_iAXP9s3tThQzNA';

request({ url: geourl, json: true }, (error, response) => {

    if (error) {
        callback('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        callback('Unable to find location. Try another search.')
    } else {
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude : response.body.features[0].center[1],
            location : response.body.features[0].place_name
        })    
    }
 })
}

   


module.exports = geocode;
